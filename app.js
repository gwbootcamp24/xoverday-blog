import express from 'express';
import {userRouter} from './router/userRouter.js';
import {postRouter} from './router/postRouter.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/users', userRouter);
app.use('/posts', postRouter);

app.get('*', (req, res) => {
    res.status(404).send(`
    <!DOCTYPE html>
  <html lang="de">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <h1>404</h1>
  </body>
  </html>
    
    `);
  });

export default app;
