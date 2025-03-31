module.exports = async (req, res) => {
  console.log('Handler invoked:', req.method, req.url);

  // Set CORS headers immediately
  res.setHeader('Access-Control-Allow-Origin', 'https://basic-login-page-using-vue-and-mongodb-atlas.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  console.log('CORS headers set');

  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS preflight');
    return res.status(200).end();
  }

  console.log('Processing request');
  res.status(200).json({ message: 'Debug response - no MongoDB' });
};