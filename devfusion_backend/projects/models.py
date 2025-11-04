from django.db import models
from django.contrib.auth.models import User
from users.models import Skill 

class Project(models.Model):
    
    # --- Project Owner & Core Details ---
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owned_projects')
    title = models.CharField(max_length=255)
    description = models.TextField()
    
    # 🟢 ADDED: Fields your portfolio component needs
    image = models.URLField(max_length=500, blank=True, null=True)
    status = models.CharField(max_length=50, blank=True, default='Active') # e.g., 'Active', 'Completed'
    featured = models.BooleanField(default=False)
    liveUrl = models.URLField(max_length=500, blank=True, null=True)
    rating = models.DecimalField(max_digits=2, decimal_places=1, null=True, blank=True)
    
    # --- Project Basics (Step 1) ---
    project_type = models.CharField(max_length=50, blank=True)
    complexity = models.CharField(max_length=50, blank=True)
    duration = models.CharField(max_length=50, blank=True)
    isOpenForCollaboration = models.BooleanField(default=True)
    seekingMentorship = models.BooleanField(default=False)
    
    # --- Team Requirements (Step 2) ---
    teamSize = models.PositiveIntegerField(default=2)
    timeCommitment = models.CharField(max_length=50, blank=True)
    crossInstitutional = models.BooleanField(default=False)
    remoteCollaboration = models.BooleanField(default=True)
    
    # --- Technology Stack (Step 3) ---
    technologies = models.ManyToManyField(Skill, blank=True, related_name='projects')
    
    # --- Collaboration Setup (Step 4) ---
    communicationTool = models.CharField(max_length=100, blank=True)
    projectManagementTool = models.CharField(max_length=100, blank=True)
    fileSharingTool = models.CharField(max_length=255, blank=True)
    meetingFrequency = models.CharField(max_length=50, blank=True)
    timezone = models.CharField(max_length=50, blank=True)
    repositoryName = models.CharField(max_length=255, blank=True) # This is your githubUrl
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title

class TeamRequirement(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='team_requirements')
    skill_name = models.CharField(max_length=100) 
    skill = models.ForeignKey(Skill, on_delete=models.SET_NULL, null=True, blank=True)
    experience = models.CharField(max_length=50) 
    is_required = models.BooleanField(default=True)
    description = models.CharField(max_length=255, blank=True)
    
    def __str__(self):
        return f"{self.skill_name} ({self.experience}) for {self.project.title}"

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
        unique_together = ('project', 'user') 

    def __str__(self):
        return f"{self.user.username} as {self.role} on {self.project.title}"