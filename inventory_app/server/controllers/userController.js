const UserModel = require('../models/User');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      const newUser = new UserModel({
        name,
        email,
        password,  
      });
  
      const user = await newUser.save();
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message || "Internal Server Error" });
    }
  };

  const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      if (password !== user.password) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      res.json({ message: 'Login successful', user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };


const getUsers = (req, res) => {
  UserModel.find()
    .then(users => res.json(users))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: err.message || "Internal Server Error" });
    });
};


const updateUser = (req, res) => {
  UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(user => res.json(user))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: err.message || "Internal Server Error" });
    });
};


const deleteUser = (req, res) => {
  UserModel.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: "User deleted" }))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: err.message || "Internal Server Error" });
    });
};

module.exports = { getUsers, createUser, loginUser, updateUser, deleteUser };
