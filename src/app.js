import env from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

// Importing the routes
import authRoutes from './routes/auth.routes';

// Initialize the app
env.config();
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.send('Sprint API');
});

// Routes Middleware
app.use('/api/auth', authRoutes);

export default app;