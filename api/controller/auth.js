const db = require('../database')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = (req, res) => {
    // check user is existed or not
    const q = 'SELECT * FROM users WHERE email = ? OR username = ?';
    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json('User already exists');

        // Generate salt and hash the password
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return res.status(500).json(err);

            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) return res.status(500).json(err);

                const q = "INSERT INTO users (`username`, `email`, `password`) VALUES (?, ?, ?)";
                const values = [req.body.username, req.body.email, hash];

                db.query(q, values, (err, data) => {
                    if (err) return res.status(500).json(err);
                    return res.status(200).json('User is created');
                });
            });
        });
    });
};

const login = (req, res) => {
    //CHECK USER
  
    const q = "SELECT * FROM users WHERE username = ?";
  
    db.query(q, [req.body.username], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("User not found!");
  
      //Check password
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );
  
      if (!isPasswordCorrect)
        return res.status(400).json("Wrong username or password!");
  
      const token = jwt.sign({ id: data[0].id }, "jwtkey");
      const { password, ...other } = data[0];
  
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(other);

    });
  };

  const logout =(req, res) =>{
      res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
      }).status(200).json("user has been logged out");
  }

module.exports = {
    register,
    login,
    logout,
}

