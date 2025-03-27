import express from 'express';

const app = express();
const PORT = 3000;

// Set static folder
app.use(express.static('public'));

// Parse URL-encoded & JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Email validation route
app.post('/email', (req, res) => {
    const submittedEmail = req.body.email;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(submittedEmail)) {
        return res.send(`
            <div class="mb-3" hx-target="this" hx-swap="outerHTML">
                <label class="form-label">Email address</label>
                <input type="email" class="form-control is-valid" name="email" hx-post="/email" value="${submittedEmail}">
                <div class="alert alert-success mt-2">
                    ✅ That email is valid!
                </div>
            </div>
        `);
    } else {
        return res.send(`
            <div class="mb-3" hx-target="this" hx-swap="outerHTML">
                <label class="form-label">Email address</label>
                <input type="email" class="form-control is-invalid" name="email" hx-post="/email" value="${submittedEmail}">
                <div class="alert alert-danger mt-2">
                    ❌ Please enter a valid email address.
                </div>
            </div>
        `);
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
