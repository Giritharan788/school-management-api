const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const schoolRoutes = require('./routes/schoolRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// We prefix routes with /api so the endpoints match the assignment or /api/addSchool
app.use('/api', schoolRoutes);

// Base route for testing
app.get('/', (req, res) => {
    res.send('School Management API is running...');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
