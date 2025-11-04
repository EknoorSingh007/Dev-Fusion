from rest_framework import serializers
from django.contrib.auth.models import User
# from projects.models import Project # (Removed from top)
from .models import Profile, Skill, Education, Certification, Achievement
from django.contrib.auth.password_validation import validate_password

# --- Simple Serializers for Profile Sub-models ---

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name']

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'

class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = '__all__'

class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = '__all__'

# 🟢 1. THIS SERIALIZER IS NOW 100% CRASH-SAFE
class SimpleMemberSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    avatar = serializers.SerializerMethodField()
    
    class Meta:
        from projects.models import ProjectMember 
        model = ProjectMember
        fields = ['name', 'avatar', 'role']

    def get_name(self, obj):
        # 'obj' is the ProjectMember.
        # Safely get the user's full name, or their username.
        if obj.user.get_full_name():
            return obj.user.get_full_name()
        return obj.user.username

    def get_avatar(self, obj):
        # 'obj' is the ProjectMember.
        # Safely check if the user has a profile AND an avatar file.
        try:
            # hasattr() is safer than checking 'if obj.user.profile'
            if hasattr(obj.user, 'profile') and obj.user.profile.avatar:
                # build_absolute_uri needs the 'request' from the context
                request = self.context.get('request')
                if request:
                    return request.build_absolute_uri(obj.user.profile.avatar.url)
                else:
                    # Fallback if request is not in context
                    return obj.user.profile.avatar.url
        except Exception:
            # Catch any error (Profile.DoesNotExist, ValueError, etc.)
            pass
        return None # Return None if no avatar

# -------------------------------------------------

# UPDATED: NestedProjectSerializer with ALL fields
class NestedProjectSerializer(serializers.ModelSerializer):
    technologies = serializers.StringRelatedField(many=True, read_only=True)
    role = serializers.SerializerMethodField()
    teamMembers = SimpleMemberSerializer(many=True, read_only=True, source='members') 
    githubUrl = serializers.CharField(source='repositoryName')

    class Meta:
        from projects.models import Project 
        model = Project
        fields = [
            'id', 'title', 'description', 'image', 'status', 'featured', 
            'liveUrl', 'rating', 'project_type', 'complexity', 'duration', 
            'teamSize', 'githubUrl', 'created_at', 'technologies',
            'role', 'teamMembers'
        ]

    def get_role(self, obj):
        profile = self.context.get('profile')
        if profile:
            try:
                member = obj.members.get(user=profile.user)
                return member.get_role_display()
            except:
                pass 
        
        if profile and obj.owner == profile.user:
            return 'Lead'
        return 'N/A'


# --- The Main Profile Serializer ---
class ProfileSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)
    education = EducationSerializer(many=True, read_only=True)
    certifications = CertificationSerializer(many=True, read_only=True)
    achievements = AchievementSerializer(many=True, read_only=True)
    
    username = serializers.CharField(source='user.username')
    email = serializers.EmailField(source='user.email')

    projects = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            'id', 'user', 'username', 'email', 'name', 'title', 'bio', 
            'avatar', 'location', 'university', 'github_url', 'linkedin_url',
            'joined_date', 'skills', 'education', 'certifications', 'achievements',
            'projects'
        ]
        read_only_fields = ['user', 'joined_date']

    def get_projects(self, instance):
        # 'instance' is the Profile
        from projects.models import Project
        
        projects_owned = instance.user.owned_projects.all()
        projects_joined_ids = instance.user.projects_joined.all().values_list('project_id', flat=True)
        projects_joined = Project.objects.filter(id__in=projects_joined_ids)
        
        all_projects = (projects_owned | projects_joined).distinct()
        
        # 🟢 2. PASS THE 'request' CONTEXT
        # We must pass the main 'request' from the view all the way down
        context = self.context
        context['profile'] = instance 
        
        return NestedProjectSerializer(all_projects, many=True, context=context).data

# --- Serializer for User Registration (Unchanged) ---
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True, label="Confirm Password")

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'password', 'password2']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        
        user.set_password(validated_data['password'])
        user.save()
        
        user.profile.name = f"{user.first_name} {user.last_name}".strip()
        user.profile.save()

        return user