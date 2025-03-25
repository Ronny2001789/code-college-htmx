import express from 'express'; 
const app = express();


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/users', async (req, res) => {
  try {
    const limit = +req.query.limit || 5;
    const response = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`);
    const users = await response.json();

    const html = `
      <div class="card-neon text-start">
        <h2 class="text-center">👨‍🚀 User Profiles</h2>
        <ul class="list-group list-group-flush">
          ${users.map(user => {
            const avatarUrl = `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(user.username)}`;
            return `
              <li class="list-group-item bg-transparent text-light d-flex align-items-center border-light">
                <img src="${avatarUrl}" class="user-avatar" alt="Avatar of ${user.name}" />
                <div>
                  <strong>${user.name}</strong><br>
                  <small>📧 ${user.email}</small>
                </div>
              </li>
            `;
          }).join('')}
        </ul>
      </div>
    `;

    res.send(html);
  } catch (error) {
    res.status(500).send(`<p>Error fetching users: ${error.message}</p>`);
  }
});

app.listen(3000, () => {
  console.log('🚀 Server ready at http://localhost:3000');
});
