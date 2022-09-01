import env from 'dotenv';
import express from 'express';
import morgan from 'morgan';

// Initialize the app
env.config();
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

export default app;