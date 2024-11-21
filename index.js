const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./configs/connectDB');
const initDB = require('./configs/initDB');
const authRoutes = require('./routes/auth-route');
const userRoutes = require('./routes/user-route');

dotenv.config();
connectDB();
initDB();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));