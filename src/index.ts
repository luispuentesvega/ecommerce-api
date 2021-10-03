import express from 'express';
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// To be able to receive POST data as JSON format
app.use(express.json());

const router = require('./routes/api');
app.use('/api', router);

app.listen(port, () => console.log(`Server started listening to port ${port}`));