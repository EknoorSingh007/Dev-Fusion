from rest_framework import serializers
from .models import Project, TeamRequirement, ProjectMember
from users.models import Skill
from users.serializers import SkillSerializer # We'll re-use the SkillSerializer
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

    # For writing (POST/PUT requests), we just want the IDs.
    # This allows your React app to send just a list of skill IDs: [1, 2, 5]
    technology_ids = serializers.PrimaryKeyRelatedField(
        many=True, 
        write_only=True, 
        queryset=Skill.objects.all(), 
        source='technologies'
    )
    
    # We'll handle creating team requirements in the view

    class Meta:
        model = Project
        fields = [
            'id', 'owner', 'title', 'description', 'project_type', 'complexity', 
            'duration', 'isOpenForCollaboration', 'seekingMentorship', 'teamSize', 
            'timeCommitment', 'crossInstitutional', 'remoteCollaboration', 
            'communicationTool', 'projectManagementTool', 'fileSharingTool', 
            'meetingFrequency', 'timezone', 'repositoryName', 'created_at', 
            
            # Nested/Write-only fields
            'technologies', # For reading
            'technology_ids', # For writing
            'team_requirements', # For reading
            'members' # For reading
        ]
        read_only_fields = ['owner', 'created_at', 'updated_at', 'members']

    def create(self, validated_data):
        # When a project is created, 'owner' isn't in the form data,
        # so we get it from the 'context' (which we will pass from the view)
        validated_data['owner'] = self.context['request'].user
        
        # Pop the 'technology_ids' data before creating the project
        technologies_data = validated_data.pop('technologies', None)
        
        # Create the project instance
        project = Project.objects.create(**validated_data)

        # Set the technologies
        if technologies_data:
            project.technologies.set(technologies_data)
            
        # Add the owner as the first member with the 'lead' role
        ProjectMember.objects.create(project=project, user=project.owner, role='lead')

        return project