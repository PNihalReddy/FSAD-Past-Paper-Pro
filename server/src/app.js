import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import upload from './middleware/upload.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
import papersRouter from './routes/papers.js';
app.use('/api/papers', papersRouter);

app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'past-paper-pro-server' });
});

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || '';

function start() {
  // Start the HTTP server immediately so health checks work even if MongoDB is down.
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`server listening on http://localhost:${PORT}`);

    // Connect to MongoDB asynchronously; don't block server start.
    if (MONGODB_URI) {
      mongoose
        .connect(MONGODB_URI)
        .then(() => console.log('connected to MongoDB'))
        .catch((err) => console.error('MongoDB connection error:', err));
    } else {
      console.log('MONGODB_URI not provided, skipping DB connection');
    }
  });

  server.on('error', (err) => {
    console.error('Server error:', err);
    process.exit(1);
  });
}

start();
