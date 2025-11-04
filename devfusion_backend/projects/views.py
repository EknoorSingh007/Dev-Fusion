from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Project, TeamRequirement, ProjectMember
from .serializers import ProjectSerializer, TeamRequirementSerializer
from users.models import Skill # Import Skill from users app

# --- 1. Project List & Create View (UPDATED) ---
class ProjectListCreateView(generics.ListCreateAPIView):
    queryset = Project.objects.all().order_by('-created_at') # Show newest first
    serializer_class = ProjectSerializer
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    # This function is now fully implemented
    def perform_create(self, serializer):
        # Get the raw data lists from the request
        team_requirements_data = self.request.data.get('team_requirements', [])
        technology_names_data = self.request.data.get('technology_names', [])

        # Save the project (which also sets the owner via the serializer's context)
        project = serializer.save(owner=self.request.user)
        
        # --- Handle Team Requirements ---
        for req_data in team_requirements_data:
            TeamRequirement.objects.create(
                project=project,
                skill_name=req_data.get('skill_name'),
                experience=req_data.get('experience'),
                is_required=req_data.get('is_required', True),
                description=req_data.get('description', '')
            )
            
        # --- Handle Technology Stack ---
        skill_objects_to_add = []
        for skill_name in technology_names_data:
            if skill_name: # Ensure it's not an empty string
                # Find the skill or create it if it doesn't exist
                skill_obj, created = Skill.objects.get_or_create(
                    name__iexact=skill_name, # Case-insensitive match
                    defaults={'name': skill_name} # Use this name if creating
                )
                skill_objects_to_add.append(skill_obj)
        
        # Add all the skills to the project's ManyToManyField
        if skill_objects_to_add:
            project.technologies.set(skill_objects_to_add)

# --- 2. Project Detail View (Unchanged) ---
class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        return [IsProjectOwner()]

# --- 3. Custom Permission (Unchanged) ---
class IsProjectOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user
