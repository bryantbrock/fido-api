import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { handlePrismaQuery } from 'prisma-hooks';
import { prisma } from './services/db';

const app = express();

// Setup middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/health-check', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.post('/api/:model/:action', async (req, res) => {
  const result = await handlePrismaQuery({
    action: req.params.action,
    count: Boolean(req.query.count),
    db: prisma,
    debug: process.env.NODE_ENV === 'development',
    model: req.params.model,
    query: req.body,
  });

  if (result?.error) {
    return res.status(422).json(result);
  }

  return res.status(200).json(result);
});

const { PORT = 8080 } = process.env;

app.listen(PORT, () =>
  console.log(`
    🚀 Server ready at: http://localhost:${PORT}
    ⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api
  `)
);
