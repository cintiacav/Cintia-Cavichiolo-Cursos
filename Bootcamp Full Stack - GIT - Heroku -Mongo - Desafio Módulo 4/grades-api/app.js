import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { db } from './models/index.js';
import { gradeRouter } from './routes/gradeRouter.js';
const DBNAME = db.url;
(async () => {
  try {
    await db.mongoose.connect(DBNAME, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado ao MongoDB Atlas:' + DBNAME);
  } catch (error) {
    console.log(`Erro no conexão - ${JSON.stringify(error.message)}`);
    process.exit();
  }
})();

const app = express();

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(gradeRouter);
app.get('/', (req, res) => {
  res.send('API em execucao');
});

app.listen(process.env.PORT, () =>
  console.log('Api iniciada na porta:' + process.env.PORT)
);
