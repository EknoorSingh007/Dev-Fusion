from django.contrib.auth.models import User
from .models import Profile, Skill
from .serializers import UserSerializer, ProfileSerializer, SkillSerializer
from rest_framework import generics, permissions, status
from rest_framework.response import Response

# --- 1. User Registration View (Sign Up) ---
# (This is unchanged)
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        headers = self.get_success_headers(serializer.data)
        
        return Response(
            {"message": "User registered successfully."},
            status=status.HTTP_201_CREATED,
            headers=headers
        )

# --- 2. User Profile View (Get & Update) ---
# 🟢 THIS VIEW IS NOW FIXED
class ProfileView(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # 🟢 THE FIX:
        # We use get_or_create. This will FIND the user's profile.
        # If one doesn't exist (like for your superuser),
        # it will CREATE one instantly.
        profile, created = Profile.objects.get_or_create(user=self.request.user)
        return profile

    def update(self, request, *args, **kwargs):
        # When updating, we also need to update the user's name on the User model
        user = request.user
        
        # Only update user fields if they are in the request data
        if 'name' in request.data:
            full_name = request.data.get('name', '').split(' ', 1)
            user.first_name = full_name[0]
            user.last_name = full_name[1] if len(full_name) > 1 else ''
        
        if 'email' in request.data:
            user.email = request.data.get('email', user.email)
        
        user.save()
        
        # Now update the profile
        profile = self.get_object()
        
        # Use partial=True to allow partial updates (patch)
        serializer = self.get_serializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)

# --- 3. Skill List View (Get All Skills) ---
# (This is unchanged)
class SkillListView(generics.ListAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [permissions.AllowAny]