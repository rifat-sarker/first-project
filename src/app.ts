import cors from 'cors';
import express, { Application, Request, Response } from 'express';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  const a = 11;

  res.send(a);
});

export default app;
