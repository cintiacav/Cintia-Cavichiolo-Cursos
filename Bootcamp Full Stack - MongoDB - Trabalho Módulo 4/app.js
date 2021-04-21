import express from 'express';
import mongoose from 'mongoose';
import { accountRouter } from './routes/accountRouter.js';
const DBNAME = 'mongodb://localhost/accounts';

//conectar ao mongo DB
(async () => {
  try {
    await mongoose.connect(DBNAME, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a base:' + DBNAME);
  } catch (err) {
    console.log('Erro ao conectar a base:' + err);
  }
})(); //acho que se auto chama

const app = express();
app.use(express.json());
app.use(accountRouter);

app.listen(3000, () => console.log('Api iniciada!'));
