from django.db import models
from django.contrib.auth.models import User
# We need to import the Skill model from our OTHER app ('users')
# This allows us to link projects and profiles to the same master list of skills
from users.models import Skill 

# --- Model 1: The Main Project Table ---
# Based on ProjectBasicsForm, TechnologyStackForm, and CollaborationSetupForm
class Project(models.Model):
    
    # --- Project Owner & Core Details ---
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owned_projects')
    title = models.CharField(max_length=255)
    description = models.TextField()
    
    # --- Project Basics (Step 1) ---
    project_type = models.CharField(max_length=50, blank=True) # e.g., 'web-app', 'ai-ml'
    complexity = models.CharField(max_length=50, blank=True)   # e.g., 'beginner', 'intermediate'
    duration = models.CharField(max_length=50, blank=True)     # e.g., '1-2-months'
    isOpenForCollaboration = models.BooleanField(default=True)
    seekingMentorship = models.BooleanField(default=False)
    
    # --- Team Requirements (Step 2) ---
    teamSize = models.PositiveIntegerField(default=2)
    timeCommitment = models.CharField(max_length=50, blank=True) # e.g., 'moderate'
    crossInstitutional = models.BooleanField(default=False)
    remoteCollaboration = models.BooleanField(default=True)
    
    # --- Technology Stack (Step 3) ---
    # We re-use the 'Skill' model from the 'users' app.
    # This efficiently stores all technologies (frontend, backend, db, etc.)
    technologies = models.ManyToManyField(Skill, blank=True, related_name='projects')
    
    # --- Collaboration Setup (Step 4) ---
    communicationTool = models.CharField(max_length=100, blank=True)
    projectManagementTool = models.CharField(max_length=100, blank=True)
    fileSharingTool = models.CharField(max_length=255, blank=True) # Can store comma-separated or JSON
    meetingFrequency = models.CharField(max_length=50, blank=True)
    timezone = models.CharField(max_length=50, blank=True)
    repositoryName = models.CharField(max_length=255, blank=True)
    
    # --- Auto-managed fields ---
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title

# --- Model 2: Team Skill Requirements ---
# Based on the dynamic form in TeamRequirementsForm.jsx
class TeamRequirement(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='team_requirements')
    
    # We link to the Skill model, but also store the text in case it's custom
    skill_name = models.CharField(max_length=100) 
    skill = models.ForeignKey(Skill, on_delete=models.SET_NULL, null=True, blank=True)
    
    experience = models.CharField(max_length=50) # e.g., 'beginner', 'any'
    is_required = models.BooleanField(default=True)
    description = models.CharField(max_length=255, blank=True)
    
    def __str__(self):
        return f"{self.skill_name} ({self.experience}) for {self.project.title}"

# --- Model 3: Project Membership ---
# This table links Users to Projects they have joined
class ProjectMember(models.Model):
    ROLE_CHOICES = [
        ('lead', 'Lead'),
        ('co-lead', 'Co-Lead'),
        ('contributor', 'Contributor'),
        ('mentor', 'Mentor'),
    ]
    
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='members')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects_joined')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='contributor')
    joined_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        # Ensures a user can only join a project once
        unique_together = ('project', 'user') 

    def __str__(self):
        return f"{self.user.username} as {self.role} on {self.project.title}"