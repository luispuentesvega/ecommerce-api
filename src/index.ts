import express from 'express';

const app = express();
const port = 3000;

app.get('/', (_, res) => res.status(200).send('Hello World from Here!'));

app.listen(port, () => console.log(`Server started listening to port ${port}`));