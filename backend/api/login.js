// const mongoose = require('mongoose');

// // MongoDB connection function
// const connectToMongo = async () => {
//   if (mongoose.connection.readyState === 0) {
//     try {
//       await mongoose.connect(process.env.MONGO_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         serverSelectionTimeoutMS: 5000,
//         connectTimeoutMS: 5000
//       });
//       console.log('MongoDB connected successfully');
//     } catch (err) {
//       console.error('MongoDB connection failed:', err.message);
//       throw err;
//     }
//   }
// };

// // Pre-connect
// connectToMongo().catch(err => console.error('Initial MongoDB connection error:', err));

// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true }
// });
// const User = mongoose.models.User || mongoose.model('User', userSchema);

// module.exports = async (req, res) => {
//   console.log('Handler invoked:', req.method, req.url);

//   // Set CORS headers immediately
//   const allowedOrigins = [
//     'https://basic-login-page-using-vue-and-mongodb-atlas.vercel.app',
//     'https://basic-login-page-using-vue-and-mongodb-atlas-o6j1.vercel.app',
//     'http://localhost:3000'  // Add your local development URL
//   ];
//   const origin = req.headers.origin;

//   if (allowedOrigins.includes(origin)) {
//     res.setHeader('Access-Control-Allow-Origin', origin);
//     res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     console.log(`CORS headers set for origin: ${origin}`);
//   } else {
//     console.log(`Origin not allowed: ${origin}`);
//   }

//   if (req.method === 'OPTIONS') {
//     console.log('Handling OPTIONS preflight');
//     return res.status(204).end();
//   }

//   if (req.method !== 'POST') {
//     console.log('Method not allowed');
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   console.log('Processing POST request');
//   const { email, password } = req.body;

//   try {
//     if (mongoose.connection.readyState !== 1) {
//       console.log('Reconnecting to MongoDB...');
//       await connectToMongo();
//     }

//     const user = await User.findOne({ email });
//     console.log('User query result:', user ? 'Found' : 'Not found');

//     if (!user) {
//       return res.status(400).json({ message: 'User not found' });
//     }
//     if (user.password !== password) { // Replace with bcrypt in production
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }
//     res.status(200).json({ message: 'Login successful', userId: user._id });
//   } catch (err) {
//     console.error('MongoDB error:', err.message);
//     res.status(503).json({ message: 'Database error', error: err.message });
//   }
// };

// api/login.js
module.exports = async (req, res) => {
  console.log('Handler invoked:', req.method, req.url);

  // Set CORS headers immediately
  const allowedOrigins = [
    'https://basic-login-page-using-vue-and-mongodb-atlas.vercel.app',
    'http://localhost:3000'
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  console.log('CORS headers set for origin:', origin);

  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS preflight');
    return res.status(204).end();
  }

  console.log('Processing request');
  res.status(200).json({ message: 'Minimal backend working', timestamp: new Date().toISOString() });
};