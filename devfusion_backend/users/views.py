from django.contrib.auth.models import User
from .models import Profile, Skill
from .serializers import UserSerializer, ProfileSerializer, SkillSerializer
from rest_framework import generics, permissions, status
from rest_framework.response import Response

# --- 1. User Registration View (Sign Up) ---
# This is a "create-only" endpoint.
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # 'AllowAny' means anyone, even unauthenticated users, can access this endpoint.
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        headers = self.get_success_headers(serializer.data)
        
        # We can also add a success message here
        return Response(
            {"message": "User registered successfully."},
            status=status.HTTP_201_CREATED,
            headers=headers
        )

# --- 2. User Profile View (Get & Update) ---
# This is a "retrieve-and-update" endpoint.
class ProfileView(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    # 'IsAuthenticated' means ONLY logged-in users can access this.
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # This function overrides the default 'get_object'
        # to ALWAYS return the profile of the user making the request.
        # This prevents a user from ever seeing or editing someone else's profile.
        return self.request.user.profile

    def update(self, request, *args, **kwargs):
        # When updating, we also need to update the user's name on the User model
        user_data = request.data.pop('user', {})
        user = request.user
        
        user.first_name = request.data.get('first_name', user.first_name)
        user.last_name = request.data.get('last_name', user.last_name)
        user.email = request.data.get('email', user.email)
        user.save()
        
        # Now update the profile
        profile = self.get_object()
        profile.name = f"{user.first_name} {user.last_name}".strip()
        
        # Use partial=True to allow partial updates (patch)
        serializer = self.get_serializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)

# --- 3. Skill List View (Get All Skills) ---
# This is a "list-only" endpoint.
class SkillListView(generics.ListAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    # Anyone can see the list of skills
    permission_classes = [permissions.AllowAny]