from . import views
from django.urls import path
from .views import edit_profile, view_profile, save_profile

urlpatterns = [
    path('', views.example, name='example'),
    path('sample-post/', views.sample_post, name='sample-post'),
    path('user/<int:user_id>/edit', edit_profile, name='edit_profile'),
    path('user/<int:user_id>/view', view_profile, name='view_profile'),
    path('user/<int:user_id>/save', save_profile, name='save_profile'),
]