from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from .models import Post
from .forms import PostForm

def post_list(request):
    posts = Post.objects.all()
    return render(request, 'post_list.html', {'posts': posts})

def post_create(request):
    if request.method == 'POST':
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save()
            
            # If it's an HTMX request, return the new post as a partial
            if request.htmx:
                return render(request, 'partials/post_item.html', {'post': post})
            
            return redirect('post_list')
    else:
        form = PostForm()

    return render(request, 'post_form.html', {'form': form})

def post_update(request, pk):
    post = get_object_or_404(Post, pk=pk)
    
    if request.method == "POST":
        form = PostForm(request.POST, instance=post)
        if form.is_valid():
            post = form.save()
            
            # HTMX response: return updated post item
            if request.htmx:
                return render(request, 'post_item.html', {'post': post})
            
            return redirect('post_list')  # Redirect for non-HTMX requests

    else:
        form = PostForm(instance=post)  # Load existing data into the form

    return render(request, 'post_form.html', {'form': form, 'post': post})


def post_delete(request, pk):
    post = get_object_or_404(Post, pk=pk)
    if request.method == "POST":
        post.delete()
        
        # If HTMX, return an empty response so the post disappears
        if request.htmx:
            return HttpResponse('')
        
        return redirect('post_list')

    return render(request, 'post_confirm_delete.html', {'post': post})
