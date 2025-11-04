from django.urls import path
from .views import RegisterView, ProfileView, SkillListView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# This file defines the URL paths for the 'users' app.
# All paths here will be prefixed with /api/ (which we'll set up in the main urls.py)

urlpatterns = [
    # --- Authentication Endpoints ---
    
    # POST /api/auth/register/
    # Handles new user sign-ups
    path('auth/register/', RegisterView.as_view(), name='register'),
    
    # POST /api/auth/login/
    # This is the main login endpoint. React sends 'username' and 'password'
    # and gets back 'access' and 'refresh' tokens.
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # POST /api/auth/token/refresh/
    # Used to get a new access token when the old one expires
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # --- Profile & Data Endpoints ---
    
    # GET, PUT, PATCH /api/profile/
    # Handles getting and updating the logged-in user's profile
    path('profile/', ProfileView.as_view(), name='profile'),
    
    # GET /api/skills/
    # Returns a list of all available skills for forms
    path('skills/', SkillListView.as_view(), name='skill-list'),
]