"""
Django settings for devfusion_api project.
"""

from pathlib import Path
import os # Make sure this is imported

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-YOUR_SECRET_KEY_GOES_HERE' # You can leave the default one for now

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # --- CIPHER'S ADDITIONS: 3rd Party Apps ---
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',

    # --- CIPHER'S ADDITIONS: Your Local Apps ---
    'users.apps.UsersConfig',
    'projects.apps.ProjectsConfig',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    # --- CIPHER'S ADDITION: CORS ---
    # This MUST be placed as high as possible, especially before CommonMiddleware
    'corsheaders.middleware.CorsMiddleware', 
    'django.middleware.common.CommonMiddleware',
    # --- END ADDITION ---
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'devfusion_api.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'devfusion_api.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'

# --- CIPHER'S ADDITION: Media Files (User Uploads) ---
# This is where user-uploaded files (like profile pictures) will be stored
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
# --- END ADDITION ---


# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# --- CIPHER'S ADDITIONS: API & SECURITY SETTINGS ---

# 1. CORS (Cross-Origin Resource Sharing) Configuration
# This tells Django to accept connections from your React app
CORS_ALLOWED_ORIGINS = [
    'http://localhost:4028',  # Your Vite server
    'http://127.0.0.1:4028',
]

# 2. Django Rest Framework (DRF) Configuration
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        # This sets JWT (token auth) as the default way to log in to our API
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}

# 3. Simple JWT (JSON Web Token) Configuration
from datetime import timedelta

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=60), # How long a login lasts (1 hour)
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),    # How long to remember a user (1 day)
}

# --- END OF CIPHER'S ADDITIONS ---