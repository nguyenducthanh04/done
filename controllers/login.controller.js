const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

class LoginController {
  async Login(req, res) {
    const { email, password } = req.body;
    console.log("email:", email);
    console.log("pass:", password);
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'Tài khoản không tồn tại' });
      }
      if (!user.email || !user.mat_khau) {
        return res.status(400).json({ message: "Email và password là bắt buộc" });
      }
      // const isMatch = bcrypt.compareSync(password, user.password);
      // if (!isMatch) {
      //   return res.status(400).json({ message: 'Sai mật khẩu' });
      // }

      const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: '1h' });

      res.json({
        message: 'Đăng nhập thành công',
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name, 
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi server' });
    }
  }
}

module.exports = new LoginController();
