const mongoose = require('mongoose');
const cors = require('cors');

const corsOptions = {
  origin: 'https://basic-login-page-using-vue-and-mongodb-atlas.vercel.app', // Exact frontend origin
  optionsSuccessStatus: 200
};

// Pre-connect to MongoDB to avoid cold start delays
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = async (req, res) => {
  console.log('Handler invoked:', req.method, req.url); // Debug

  // Apply CORS
  cors(corsOptions)(req, res, async () => {
    console.log('CORS applied'); // Debug

    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    console.log('Processing POST request'); // Debug
    const { email, password } = req.body;

    try {
      // Ensure MongoDB is connected
      if (mongoose.connection.readyState !== 1) {
        await mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
      }

      const user = await User.findOne({ email });
      console.log('User query result:', user); // Debug

      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      if (user.password !== password) { // Use bcrypt in production
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      res.status(200).json({ message: 'Login successful', userId: user._id });
    } catch (err) {
      console.error('Error in handler:', err); // Debug
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });
};