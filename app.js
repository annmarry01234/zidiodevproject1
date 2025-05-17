const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');
const chartRoutes = require('./routes/chartRoutes');
const userRoutes = require('./routes/userRoutes');
const authenticate = require('./middleware/authenticate');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// 1. CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};
app.use(cors(corsOptions));

// 2. Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 3. Serve static files (uploaded files)
app.use('/uploads', express.static('uploads'));

// 4. Health check route
app.get('/', (req, res) => {
  res.send('Backend is working');
});

// 5. API routes
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/charts', chartRoutes);
app.use('/api', userRoutes);

// 6. 404 fallback
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// 7. MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// 8. Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
