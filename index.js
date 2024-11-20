const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./configs/connectDB');
const initDB = require('./configs/initDB');

dotenv.config();
connectDB();
initDB();

const app = express();
app.use(express.json());

app.use('/', (req, res) => {
  res.send('Hello World');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));