from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# --- Model 1: The Skill Table ---
# Stores a master list of skills (e.g., "React", "Python", "Figma")
class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.name

# --- Model 2: The User Profile Table ---
# This holds all the extra data related to a user
class Profile(models.Model):
    # This line links the Profile to Django's built-in User model
    # One user has one profile. If a User is deleted, their profile is also deleted.
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')

    # Fields from your ProfileHeader.jsx
    name = models.CharField(max_length=255, blank=True)
    title = models.CharField(max_length=255, blank=True)
    bio = models.TextField(blank=True, null=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True) # Stores profile pictures
    location = models.CharField(max_length=100, blank=True)
    university = models.CharField(max_length=255, blank=True)
    
    # Fields from your SkillMatrix.jsx
    # A ManyToManyField means one profile can have many skills,
    # and one skill can belong to many profiles.
    skills = models.ManyToManyField(Skill, blank=True, related_name='profiles')

    # Other useful fields
    github_url = models.URLField(max_length=255, blank=True)
    linkedin_url = models.URLField(max_length=255, blank=True)
    joined_date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username}'s Profile"

# --- Signal: Auto-create Profile ---
# This small function tells Django to automatically create a Profile
# every time a new User is created.
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance, name=instance.get_full_name())

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

# --- Models 3, 4, 5: Academic Background ---
# These models are based on your AcademicBackground.jsx component

class Education(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='education')
    degree = models.CharField(max_length=255)
    institution = models.CharField(max_length=255)
    location = models.CharField(max_length=255, blank=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True) # Can be null if ongoing
    gpa = models.CharField(max_length=10, blank=True)
    
    class Meta:
        ordering = ['-end_date'] # Show most recent education first

class Certification(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='certifications')
    name = models.CharField(max_length=255)
    issuer = models.CharField(max_length=255)
    date_issued = models.DateField(null=True, blank=True)
    credential_url = models.URLField(max_length=500, blank=True)
    
    class Meta:
        ordering = ['-date_issued']

class Achievement(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='achievements')
    title = models.CharField(max_length=255)
    organization = models.CharField(max_length=255, blank=True)
    date_achieved = models.DateField(null=True, blank=True)
    description = models.TextField(blank=True)
    
    class Meta:
        ordering = ['-date_achieved']