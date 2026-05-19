const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const schoolRoutes = require('./routes/schoolRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', schoolRoutes);

app.get('/', (req, res) => {
    res.send('School Management API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
