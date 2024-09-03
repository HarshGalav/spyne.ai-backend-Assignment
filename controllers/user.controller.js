const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSecret = 'your_jwt_secret'; // Replace with your actual secret

// User signup
exports.signup = async (req, res) => {
  const { name, mobile, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, mobile, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Follow user
exports.followUser = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body; // ID of the user who wants to follow
  try {
    const user = await User.findById(userId);
    const userToFollow = await User.findById(id);
    if (!user || !userToFollow) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!user.following.includes(id)) {
      user.following.push(id);
      userToFollow.followers.push(userId);
      await user.save();
      await userToFollow.save();
      res.json({ message: 'User followed successfully' });
    } else {
      res.status(400).json({ message: 'Already following this user' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Unfollow user
exports.unfollowUser = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body; // ID of the user who wants to unfollow
  try {
    const user = await User.findById(userId);
    const userToUnfollow = await User.findById(id);
    if (!user || !userToUnfollow) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.following.includes(id)) {
      user.following.pull(id);
      userToUnfollow.followers.pull(userId);
      await user.save();
      await userToUnfollow.save();
      res.json({ message: 'User unfollowed successfully' });
    } else {
      res.status(400).json({ message: 'Not following this user' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Other user controllers...
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  const { name, mobile, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, mobile, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, mobile, email, password } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (name) user.name = name;
    if (mobile) user.mobile = mobile;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
    await user.save();
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchUserByName = async (req, res) => {
  const { name } = req.query;
  try {
    const users = await User.find({ name: new RegExp(name, 'i') });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
