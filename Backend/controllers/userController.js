const User = require('../models/User');

// Add a user
exports.addUser = async (req, res) => {
  try {
    const { name, email, pass } = req.body;
    const user = new User({ name, email, pass });
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, pass } = req.body;
    const user = await User.findByIdAndUpdate(id, { name, email, pass }, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err });
  }
};
