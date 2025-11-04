from django.contrib import admin
from .models import Profile, Skill, Education, Certification, Achievement

# Register your models here so they appear in the admin panel
admin.site.register(Profile)
admin.site.register(Skill)
admin.site.register(Education)
admin.site.register(Certification)
admin.site.register(Achievement)