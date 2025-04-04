# views.py
from django.shortcuts import render
from django.http import HttpResponse
from django.middleware.csrf import get_token

from inverter.forms import SampleForm


def sample_post(request, *args, **kwargs):
    form = SampleForm(request.POST or None)

    if form.is_valid():
        # form.cleaned_data now contains the validated data
        print(f'{ form.cleaned_data= }')
        return HttpResponse('<p class="success">Form submitted successfully! ✅</p>')
    else:
        # form.errors contains the form validation errors
        return HttpResponse(f'<p class="error">Your form submission was unsuccessful ❌. Please would you correct the errors? The current errors: {form.errors}</p>')


def example(request):
    return render(request, 'example.html')





# Simulated database (in a real app, use models)
user_data = {
    1: {"name": "Greg Lim", "bio": "Follower of Christ | Author of Best-selling Amazon Tech Books and Creator of Coding Courses"}
}

def edit_profile(request, user_id):
    user = user_data.get(user_id, {"name": "Unknown", "bio": ""})
    
    # Get CSRF token
    csrf_token = get_token(request)

    # Return the form with CSRF token as a hidden input field
    return HttpResponse(f"""
        <form method="POST" hx-post="/user/{user_id}/save" hx-target=".card" hx-swap="outerHTML">
            <input type="hidden" name="csrfmiddlewaretoken" value="{csrf_token}">
            <div class="card fade-in" style="width: 22rem;" hx-target=".card" hx-swap="outerHTML">
                <div class="card-body text-center">
                    <input class="form-control" type="text" name="name" id="name" value="{user['name']}" />
                    <textarea class="form-control mt-2" name="bio">{user['bio']}</textarea>
                    <button class="btn btn-success mt-3" type="submit">
                        Save
                    </button>
                    <button class="btn btn-secondary mt-3" hx-get="/user/{user_id}/view" hx-target=".card" hx-swap="outerHTML">
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    """)


def view_profile(request, user_id):
    user = user_data.get(user_id, {"name": "Unknown", "bio": ""})
    
    return HttpResponse(f"""
        <div class="card fade-in" style="width: 22rem;" hx-target=".card" hx-swap="outerHTML">
            <div class="card-body text-center">
                <h5 class="card-title">{user['name']}</h5>
                <p class="card-text">{user['bio']}</p>
                <button class="btn btn-primary mt-3" hx-get="/user/{user_id}/edit" hx-target=".card" hx-swap="outerHTML">
                    Edit Profile
                </button>
            </div>
        </div>
    """)

def save_profile(request, user_id):
    if request.method == "POST":
        name = request.POST.get("name", "Unknown")
        bio = request.POST.get("bio", "")

        user_data[user_id] = {"name": name, "bio": bio}  # Simulating DB update

        return HttpResponse(f"""
            <div class="card fade-in" style="width: 22rem;" hx-target=".card" hx-swap="outerHTML">
                <div class="card-body text-center">
                    <h5 class="card-title">{name}</h5>
                    <p class="card-text">{bio}</p>
                    <button class="btn btn-primary mt-3" hx-get="/user/{user_id}/edit" hx-target=".card" hx-swap="outerHTML">
                        Edit Profile
                    </button>
                </div>
            </div>
        """)


