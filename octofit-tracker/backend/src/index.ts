import express from 'express';
import apiRouter from './routes';
import { MONGODB_URI, connectDB } from './config/database';

const app = express();
const PORT = Number(process.env.PORT || 8000);
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const API_URL = process.env.API_URL ||
  (CODESPACE_NAME
    ? `https://${CODESPACE_NAME}-8000.app.github.dev`
    : `http://localhost:${PORT}`);

app.use(express.json());
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.json({
    message: 'OctoFit Tracker API is running.',
    apiUrl: API_URL,
    codespaceName: CODESPACE_NAME || null,
  });
});

connectDB()
  .then(() => {
    console.log('Connected to MongoDB at', MONGODB_URI);
    console.log(`API URL: ${API_URL}`);
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
