from django.urls import path
from .views import ProjectListCreateView, ProjectDetailView

# This file defines the URL paths for the 'projects' app.
# All paths here will be prefixed with /api/projects/ (which we'll set up next)

urlpatterns = [
    # GET, POST /api/projects/
    # Handles listing all projects and creating a new one
    path('', ProjectListCreateView.as_view(), name='project-list-create'),
    
    # GET, PUT, PATCH, DELETE /api/projects/<int:pk>/
    # Handles getting, updating, or deleting a single project
    path('<int:pk>/', ProjectDetailView.as_view(), name='project-detail'),
]