// server/server.js
const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const wholesaleRoutes = require('./routes/wholesaleRoutes');
const retailRoutes = require('./routes/retailRoutes');
const authenticateToken = require('./middleware/auth');

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/wholesale', authenticateToken, wholesaleRoutes);
app.use('/api/retail', authenticateToken, retailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
