import express from 'express';
import escapeHtml from 'escape-html';

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Edit Form Route
app.get('/user/:id/edit', (req, res) => {
  res.send(`
    <form class="fade-in" hx-put="/user/${req.params.id}" hx-target="this" hx-swap="outerHTML">
      <div class="mb-3">
        <label for="name" class="form-label text-info">Name</label>
        <input type="text" class="form-control" id="name" name="name" value="Greg Lim">
      </div>
      <div class="mb-3">
        <label for="bio" class="form-label text-info">Bio</label>
        <textarea class="form-control" id="bio" name="bio" rows="3">
          Follower of Christ | Author of Best-selling Amazon Tech Books and Creator of Coding Courses
        </textarea>
      </div>
      <button type="submit" class="btn btn-primary w-100 mb-2">Save Changes</button>
      <button class="btn btn-secondary w-100" hx-get="/">Cancel</button>
    </form>
  `);
});

// Save Updated Info
app.put('/user/:id', (req, res) => {
  const name = escapeHtml(req.body.name || 'Unknown');
  const bio = escapeHtml(req.body.bio || 'No bio provided');

  res.send(`
    <div class="card fade-in" style="width: 22rem;" hx-target="this" hx-swap="outerHTML">
      <div class="card-body text-center">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">${bio}</p>
        <button class="btn btn-primary mt-3" hx-get="/user/${req.params.id}/edit">
          Edit Profile
        </button>
      </div>
    </div>
  `);
});

app.listen(3000, () => {
  console.log('🚀 Neon server running at http://localhost:3000');
});
