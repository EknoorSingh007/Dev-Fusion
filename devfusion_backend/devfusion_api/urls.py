from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # 1. Django Admin site
    path('admin/', admin.site.urls),
    
    # 2. Include URLs from your 'users' app
    #    This connects /api/auth/login/, /api/profile/, etc.
    path('api/', include('users.urls')),
    
    # 3. Include URLs from your 'projects' app
    #    This connects /api/projects/
    path('api/projects/', include('projects.urls')),
]

# This is a helper for serving user-uploaded files (like profile pictures)
# during development.
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)