const { User } = require("../../models");

module.exports = {
  getMyInfos: async (req, res) => {
    res.send({ id: req.user.id, firstname: req.user.firstname, lastname: req.user.lastname, email: req.user.email });
  },

  editProfile: async (req, res) => {
    try {
      const user = await User.update(req.body, { where: { id: req.user.id } });
      res.send({ message: "Profile updated successfully", user });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
};
