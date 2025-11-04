from rest_framework import serializers
from django.contrib.auth.models import User
# 🟢 1. Import the Project model
from projects.models import Project 
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
        fields = '__all__' # Includes all fields: id, degree, institution, etc.

class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = '__all__'

class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = '__all__'

# 🟢 2. Create a simple Project Serializer just for nesting
# This avoids circular import issues and gives the profile just the data it needs.
class NestedProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        # These are the fields your ProjectPortfolio.jsx component can use
        fields = [
            'id', 'title', 'description', 
            # 'status', # We can add these fields later
            # 'role', 
            # 'technologies', 
            'teamSize', 'duration', 
            # 'githubUrl',
            'created_at',
        ]
        read_only = True


# --- The Main Profile Serializer (UPDATED) ---
class ProfileSerializer(serializers.ModelSerializer):
    # These 'Nested Serializers' pull in all the related data
    skills = SkillSerializer(many=True, read_only=True)
    education = EducationSerializer(many=True, read_only=True)
    certifications = CertificationSerializer(many=True, read_only=True)
    achievements = AchievementSerializer(many=True, read_only=True)
    
    # These fields pull from the 'User' model, not the 'Profile' model
    username = serializers.CharField(source='user.username')
    email = serializers.EmailField(source='user.email')

    # 🟢 3. Add the nested projects
    # We use 'source' to get the projects related to the 'user' (not the 'profile')
    projects = NestedProjectSerializer(many=True, read_only=True, source='user.owned_projects')

    class Meta:
        model = Profile
        # These are all the fields your frontend needs
        fields = [
            'id', 
            'user', 
            'username', 
            'email',
            'name', 
            'title', 
            'bio', 
            'avatar', 
            'location', 
            'university',
            'github_url', 
            'linkedin_url',
            'joined_date',
            'skills', # Nested list of skill objects
            'education', # Nested list of education objects
            'certifications', # Nested list of certification objects
            'achievements', # Nested list of achievement objects
            'projects' # 🟢 4. Add 'projects' to the fields list
        ]
        # We set 'user' as read-only because it's set automatically
        read_only_fields = ['user', 'joined_date']

# --- Serializer for User Registration ---
class UserSerializer(serializers.ModelSerializer):
    # We add a 'password' field that is write-only (can't be read back)
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True, label="Confirm Password")

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'password', 'password2']

    def validate(self, attrs):
        # Check that the two passwords match
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        # Create the new user object
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        
        # Set the password correctly (hashes it)
        user.set_password(validated_data['password'])
        user.save()
        
        # We also set the 'name' in the profile from the first/last name
        user.profile.name = f"{user.first_name} {user.last_name}".strip()
        user.profile.save()

        return user