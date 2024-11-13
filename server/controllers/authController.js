// server/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const GitHub = require('github-api');

const JWT_SECRET = process.env.JWT_SECRET;
const github = new GitHub({ token: process.env.GITHUB_TOKEN });
const repo = github.getRepo(process.env.GITHUB_USERNAME, 'jewellery-wholesale-accounts');

const registerOrLogin = async (req, res) => {
  const { officeId, password, role } = req.body;
  const usersFile = await repo.getContents('main', 'server/models/users.json', true);
  const users = JSON.parse(usersFile.data);

  // Register if Office ID not found
  if (!users[officeId]) {
    const hashedPassword = await bcrypt.hash(password, 10);
    users[officeId] = { password: hashedPassword, role };
    await repo.writeFile('main', 'server/models/users.json', JSON.stringify(users), `Register user ${officeId}`);
    const token = jwt.sign({ officeId, role }, JWT_SECRET, { expiresIn: '2h' });
    return res.json({ token });
  }

  // Login if Office ID found and password is valid
  const isPasswordValid = await bcrypt.compare(password, users[officeId].password);
  if (isPasswordValid) {
    const token = jwt.sign({ officeId, role }, JWT_SECRET, { expiresIn: '2h' });
    return res.json({ token });
  }

  res.status(400).json({ message: 'Invalid credentials' });
};

module.exports = { registerOrLogin };
