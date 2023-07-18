import express from 'express';
import { json } from 'express';
import cors from 'cors';
import routerIndex from '../routes/index.routes';
import env from '../utils/environment';

// SETTINGS
const app = express();
app.set('port', env.PORT || 3000);

// MIDDLEWARES
app.use(json());
app.use(
  cors({
    origin: env.ALLOWED_ORIGIN || 'http://localhost:5174',
    optionsSuccessStatus: 200,
  })
);

// ROUTES
app.get('/', (req, res) => res.send('Server is up'));
app.use('/api', routerIndex);

// ERROR HANDLER

    // app.use((err,req,res) => {
    //     // HANDLE ERRORS
    // })

export default app;