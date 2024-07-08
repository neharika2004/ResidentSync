const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({});
    }

    const token = authHeader.split(" ")[1];


  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded=jwt.verify(token, jwtSecret);
    console.log(decoded);
  } catch (error) {
    
  }
}
    
module.exports = verifyToken;
