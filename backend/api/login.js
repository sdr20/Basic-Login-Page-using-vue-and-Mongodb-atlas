const mongoose = require('mongoose');
const cors = require('cors');

const corsOptions = {
  origin: 'https://basic-login-page-using-vue-and-mongodb-atlas.vercel.app/', // Exact frontend URL
  optionsSuccessStatus: 200
};

module.exports = async (req, res) => {
  // Apply CORS
  cors(corsOptions)(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    // Connect to MongoDB Atlas
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    }

    const userSchema = new mongoose.Schema({
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true }
    });
    const User = mongoose.models.User || mongoose.model('User', userSchema);

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      if (user.password !== password) { // Use bcrypt in production
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      res.status(200).json({ message: 'Login successful', userId: user._id });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });
};