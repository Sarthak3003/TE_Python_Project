from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from rest_framework.authtoken import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('form/', include('Form.urls')),
    path('auth/', include('accounts.urls')),
    path('api-token-auth', views.obtain_auth_token)
]