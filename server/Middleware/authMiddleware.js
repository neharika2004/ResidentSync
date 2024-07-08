// const jwt = require('jsonwebtoken');
// const UserModel = require('../models/userSchema');
// require('dotenv').config();

// const jwtSecret = process.env.JWT_SECRET;

// const authenticateUser = async (req, res) => {
//   const { name, password } = req.body;

//   try {
//     const user = await UserModel.findOne({ name });
//     if (!user) {
//       return res.status(404).json({ message: 'No record exists!' });
//     }
//     if (user.password !== password) {
//       return res.status(401).json({ message: 'The password is incorrect' });
//     }

//     // Generate a JWT token
//     const token = jwt.sign({ id: user._id, name: user.name }, jwtSecret, { expiresIn: '1h' });

//     res.json({ message: 'Authenticated successfully', token });
//   } catch (err) {
//     console.error('Internal server error:', err); // Log the error
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// module.exports = { authenticateUser };


const jwt = require('jsonwebtoken');
const UserModel = require('../models/userSchema');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

const authenticateUser = async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await UserModel.findOne({ name });
    if (!user) {
      return res.status(404).json({ message: 'No record exists!' });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: 'The password is incorrect' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, name: user.name }, jwtSecret, { expiresIn: '1h' });

    // Include username and user ID in the response
    res.json({
      message: 'Authenticated successfully',
      token,
      username: user.name,
      userId: user._id
    });
  } catch (err) {
    console.error('Internal server error:', err); // Log the error
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { authenticateUser };

