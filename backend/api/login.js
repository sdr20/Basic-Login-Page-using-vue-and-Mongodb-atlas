// Import dependencies
const mongoose = require('mongoose');

// MongoDB connection function with error handling
const connectToMongo = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Timeout after 5s to avoid 504
        connectTimeoutMS: 5000 // Quick timeout for connection
      });
      console.log('MongoDB connected successfully');
    } catch (err) {
      console.error('MongoDB connection failed:', err.message);
      throw err; // Propagate error to handler
    }
  }
};

// Pre-connect on module load (runs once per instance)
connectToMongo().catch(err => console.error('Initial MongoDB connection error:', err));

// Define schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.models.User || mongoose.model('User', userSchema);

// Serverless handler
module.exports = async (req, res) => {
  console.log('Handler invoked:', req.method, req.url);

  // Set CORS headers immediately (before any async operations)
  res.setHeader('Access-Control-Allow-Origin', 'https://basic-login-page-using-vue-and-mongodb-atlas.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS preflight');
    return res.status(200).end();
  }

  // Restrict to POST
  if (req.method !== 'POST') {
    console.log('Method not allowed');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  console.log('Processing POST request');
  const { email, password } = req.body;

  try {
    // Double-check connection (reconnect if dropped)
    if (mongoose.connection.readyState !== 1) {
      console.log('Reconnecting to MongoDB...');
      await connectToMongo();
    }

    // Query user
    const user = await User.findOne({ email });
    console.log('User query result:', user ? 'Found' : 'Not found');

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    if (user.password !== password) { // Replace with bcrypt.compare in production
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful', userId: user._id });
  } catch (err) {
    console.error('Request error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};