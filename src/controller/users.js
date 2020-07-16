import User from "../models/user";

module.exports = {
  getUsers: async (req, res) => {
    const users = await User.find();
    res.json(
      users.map((user) => ({
        _id: user._id,
        email: user.email,
        roles: user.roles,
      }))
    );
  },
  getOneUser: async (req, res) => {
    const user = await User.findById(req.params.uid);
    res.json({
      _id: user._id,
      email: user.email,
      roles: user.roles,
    });
  },
  createUser: async (req, res, next) => {
    const newUser = await User.create(req.body);
    res.json({
      _id: newUser._id,
      email: newUser.email,
      roles: newUser.roles,
    });
  },
  updateUser: async (req, res, next) => {
    const userUpdate = await User.findByIdAndUpdate(req.params.uid, req.body, {
      new: true,
    });
    res.json(userUpdate);
  },
  deleteUser: async (req, res, next) => {
    const deletedUser = await User.findByIdAndDelete(req.params.uid);
    res.json({
      _id: deletedUser._id,
      email: deletedUser.email,
      roles: deletedUser.roles,
    });
  },
  getOneUser: async (req, res) => {
    const users = await User.findById(req.params.uid);
    res.json(users);
  },
  createUser: async (req, res, next) => {
    const newUser = new User(req.body);
    newUser.password = await newUser.encryptPassword(newUser.password);
    await newUser.save();
    res.json(newUser);
  },
  updateUser: async (req, res, next) => {
    const userUpdate = await User.findByIdAndUpdate(req.params.uid, req.body, {
      new: true,
    });
    res.json(userUpdate);
  },
  deleteUser: async (req, res, next) => {
    const deletedUser = await User.findByIdAndDelete(req.params.uid);
    res.json(deletedUser);
  },
};
