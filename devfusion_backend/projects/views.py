from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Project, TeamRequirement, ProjectMember
from .serializers import ProjectSerializer, TeamRequirementSerializer
from users.models import Skill # Import Skill from users app

# --- 1. Project List & Create View ---
# Handles GET (all projects) and POST (create project)
class ProjectListCreateView(generics.ListCreateAPIView):
    queryset = Project.objects.all().order_by('-created_at') # Show newest first
    serializer_class = ProjectSerializer
    
    def get_permissions(self):
        # Allow anyone to SEE the list of projects (GET)
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        # But only authenticated users can CREATE (POST)
        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        # When creating, we pass the 'request' object to the serializer's context
        # This allows our serializer to find 'request.user' and set the owner
        
        # We also handle the TeamRequirements manually here
        team_requirements_data = self.request.data.get('team_requirements', [])
        
        # Save the project (which also sets the owner)
        project = serializer.save(owner=self.request.user)
        
        # Now, create the TeamRequirement objects
        for req_data in team_requirements_data:
            # We assume the frontend sends skill_name, experience, is_required, description
            TeamRequirement.objects.create(
                project=project,
                skill_name=req_data.get('skill_name'),
                experience=req_data.get('experience'),
                is_required=req_data.get('is_required', True),
                description=req_data.get('description', '')
            )

# --- 2. Project Detail, Update & Delete View ---
# Handles GET (one project), PUT, PATCH, and DELETE
class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    
    def get_permissions(self):
        # Allow anyone to VIEW a single project (GET)
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        # But only the project owner can UPDATE (PUT/PATCH) or DELETE
        return [IsProjectOwner()]

# --- 3. Custom Permission: IsProjectOwner ---
# This is a custom rule we create to protect projects
class IsProjectOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of a project to edit or delete it.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request (GET, HEAD or OPTIONS)
        if request.method in permissions.SAFE_METHODS:
            return True
            
        # Write permissions are only allowed to the owner of the project.
        return obj.owner == request.user