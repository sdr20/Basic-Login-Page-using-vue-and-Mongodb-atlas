const cors = require('cors');

const corsOptions = {
  origin: 'https://basic-login-page-using-vue-and-mongodb-atlas.vercel.app', // Exact frontend origin
  optionsSuccessStatus: 200
};

module.exports = (req, res) => {
  console.log('Handler invoked:', req.method, req.url); // Debug

  // Apply CORS manually
  res.setHeader('Access-Control-Allow-Origin', 'https://basic-login-page-using-vue-and-mongodb-atlas.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS preflight'); // Debug
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    console.log('Method not allowed'); // Debug
    return res.status(405).json({ message: 'Method not allowed' });
  }

  console.log('Processing POST request'); // Debug
  res.status(200).json({ message: 'Test response from backend' });
};