from rest_framework import serializers
from .models import Project, TeamRequirement, ProjectMember
from users.models import Skill
# We can safely import this serializer because users/serializers.py does not import from this file
from users.serializers import SkillSerializer 
from django.contrib.auth.models import User

# --- Serializer for Project Members ---
class ProjectMemberSerializer(serializers.ModelSerializer):
    # We'll show the username for the user field
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = ProjectMember
        fields = ['id', 'user', 'username', 'role', 'joined_at']

# --- Serializer for Team Skill Requirements ---
class TeamRequirementSerializer(serializers.ModelSerializer):
    # We'll show the skill name for the skill field
    skill_name = serializers.CharField() 

    class Meta:
        model = TeamRequirement
        fields = ['id', 'skill_name', 'experience', 'is_required', 'description']

# --- The Main Project Serializer ---
class ProjectSerializer(serializers.ModelSerializer):
    # For reading (GET requests), we want to show the full, nested data.
    owner = serializers.ReadOnlyField(source='owner.username')
    technologies = SkillSerializer(many=True, read_only=True)
    team_requirements = TeamRequirementSerializer(many=True, read_only=True)
    members = ProjectMemberSerializer(many=True, read_only=True)

    # For writing (POST requests), we accept a simple list of names
    technology_names = serializers.ListField(
        child=serializers.CharField(max_length=100),
        write_only=True,
        required=False # Make it optional
    )
    
    class Meta:
        model = Project
        fields = [
            'id', 'owner', 'title', 'description', 'project_type', 'complexity', 
            'duration', 'isOpenForCollaboration', 'seekingMentorship', 'teamSize', 
            'timeCommitment', 'crossInstitutional', 'remoteCollaboration', 
            'communicationTool', 'projectManagementTool', 'fileSharingTool', 
            'meetingFrequency', 'timezone', 'repositoryName', 'created_at', 
            
            # Nested/Write-only fields
            'technologies',      # For reading
            'technology_names',  # For writing
            'team_requirements', # For reading
            'members'            # For reading
        ]
        read_only_fields = ['owner', 'created_at', 'updated_at', 'members']

    def create(self, validated_data):
        # We manually handle 'technology_names' and 'team_requirements'
        # so we pop them from the data before creating the project
        validated_data.pop('team_requirements', [])
        validated_data.pop('technology_names', [])
        
        # Create the project instance
        project = Project.objects.create(**validated_data)
        
        # Add the owner as the first member with the 'lead' role
        ProjectMember.objects.create(project=project, user=project.owner, role='lead')

        return project