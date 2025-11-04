from django.contrib import admin
from .models import Project, TeamRequirement, ProjectMember

# Register your models here
admin.site.register(Project)
admin.site.register(TeamRequirement)
admin.site.register(ProjectMember)