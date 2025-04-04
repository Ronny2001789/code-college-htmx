# forms.py
from django import forms
from .models import Post  # Assuming Post is your model

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'content']  # List the fields you want in your form
