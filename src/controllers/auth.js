require("dotenv").config();
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    try {
      const { firstname, lastname, email, password, confirmPassword } = req.body;

      if (password != confirmPassword) {
        return res.status(401).send({ message: "Passwords aren't equal" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ firstname, lastname, email, password: hashedPassword });

      res.status(201).send({
        success: true,
        user: { id: user.id, firstname, lastname, email }
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send({ message: "Email or Password wrong" });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.status(200).send({ 
        message: "Successfully logged in", 
        user: { id: user.id, firstname: user.firstname, lastname: user.lastname, email: user.email, token } 
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
};
