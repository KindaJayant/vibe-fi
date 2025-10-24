import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import classifyRouter from './routes/classify.js';

const app = express();
app.use(cors({ origin: 'http://localhost:5173' })); // client dev port
app.use(express.json());

// Health
app.get('/health', (_req, res) => res.json({ ok: true, uptime: process.uptime() }));

// Routes
app.use('/api', classifyRouter);

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, { autoIndex: true })
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`✅ API on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connect error:', err);
    process.exit(1);
  });
