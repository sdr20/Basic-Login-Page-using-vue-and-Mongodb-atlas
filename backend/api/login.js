const mongoose = require('mongoose');

// Pre-connect to MongoDB outside the handler
const connectToMongo = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000 // Timeout after 5s to avoid 504
    });
    console.log('MongoDB connected');
  }
};

// Connect immediately on module load
connectToMongo().catch(err => console.error('MongoDB initial connection error:', err));

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = async (req, res) => {
  console.log('Handler invoked:', req.method, req.url);

  // Set CORS headers immediately
  res.setHeader('Access-Control-Allow-Origin', 'https://basic-login-page-using-vue-and-mongodb-atlas.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS preflight');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    console.log('Method not allowed');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  console.log('Processing POST request');
  const { email, password } = req.body;

  try {
    // Ensure connection is ready
    if (mongoose.connection.readyState !== 1) {
      await connectToMongo();
    }

    const user = await User.findOne({ email });
    console.log('User query result:', user);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    if (user.password !== password) { // Use bcrypt in production
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful', userId: user._id });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};