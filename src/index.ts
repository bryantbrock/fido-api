import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import buyerRoutes from './routes/api/buyers';
import sellerRoutes from './routes/api/sellers';
import loginRoutes from './routes/api/login';

const app = express();

// Setup middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/login', loginRoutes);
app.use('/api/buyers', buyerRoutes);
app.use('/api/sellers', sellerRoutes);

const { PORT } = process.env;

app.listen(PORT, () =>
  console.log(`
    🚀 Server ready at: http://localhost:${PORT}
    ⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api
  `)
);
