const { comparePassword } = require('../Helpers/bcrypt');
const { signToken } = require('../Helpers/jwt');
const { User } = require('../models');

class UserController {
  static async login(req, res) {
    try {
      const { email, password, berak } = req.body;
      console.log(req.body);

      if (!email) {
        res.status(400).json({ message: 'Email is missing' });
        return;
      }

      if (!password) {
        res.status(400).json({ message: 'Password is missing' });
        return;
      }

      const user = await User.findOne({ where: { email } });
      // console.log(user.role)
      // const role = user.role
      if (!user) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }

      const isValidPassword = comparePassword(password, user.password);

      if (!isValidPassword) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }

      const accessToken = signToken({ id: user.id });

      res.json({ accessToken, email });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async addUser(req, res) {
    try {
      const { email, password } = req.body;
      const createdUser = await User.create({ email, password });

      res.status(201).json({
        id: createdUser.id,
        email: createdUser.email,
      });
    } catch (error) {
      console.log(error);
      if (error.name === 'SequelizeValidationError') {
        res.status(400).json({ message: error.errors[0].message });
        return;
      }
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = UserController;
