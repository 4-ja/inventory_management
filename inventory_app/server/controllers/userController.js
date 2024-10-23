const UserModel = require('../models/User');


const createUser = (req, res) => {
  const newUser = new UserModel(req.body);
  newUser.save()
      .then(user => res.json(user))
      .catch(err => {
          console.error(err);
          res.status(500).json({ message: err.message || "Internal Server Error" });
      });
};


// Get all users
const getUsers = (req, res) => {
  UserModel.find()
      .then(users => res.json(users))
      .catch(err => {
          console.error(err);
          res.status(500).json({ message: err.message || "Internal Server Error" });
      });
};

// Update user by id
const updateUser = (req, res) => {
  UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(user => res.json(user))
      .catch(err => {
          console.error(err);
          res.status(500).json({ message: err.message || "Internal Server Error" });
      });
};

// Delete user by id
const deleteUser = (req, res) => {
  UserModel.findByIdAndDelete(req.params.id)
      .then(() => res.json({ message: "User deleted" }))
      .catch(err => {
          console.error(err);
          res.status(500).json({ message: err.message || "Internal Server Error" });
      });
};


module.exports = { getUsers, createUser, updateUser, deleteUser };
