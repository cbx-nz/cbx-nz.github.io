const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Load users from JSON file
const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));

// Routes
// Render Login Page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login-system/views/login.html');
});

// Handle Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = users.find(user => user.email === email);

  if (user) {
    // Check password
    if (user.password === password) {
      res.send('<h1>Login Successful!</h1>');
    } else {
      res.send('<h1>Incorrect Password</h1>');
    }
  } else {
    res.send('<h1>User not found</h1>');
  }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
