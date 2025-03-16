const { validateuser, validatelogin } = require("../middlewares/validate");
const accountmodel = require("../models/account");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const getlogin = async (req, res) => {
  try {
    res.render("login", {
      message: req.query?.message,
      error: req.query?.error,
    });
  } catch (err) {
    console.log(err);
    res.render("500");
  }
};

const getRegister = async (req, res) => {
  try {
    res.render("signup", {
      message: req.query?.message,
      error: req.query?.error,
    });
  } catch (err) {
    console.log(err);
    res.render("500");
  }
};

const createaccount = async (req, res) => {
  try {
    const { error } = validateuser.validate(req.body);
    if (error) {
      return res.redirect(`/register?error=${error.details[0].message}`);
    }

    const { firstname, lastname, email, password, confirmpassword } = req.body;
    const checkemail = await accountmodel.findOne({ email: email });
    if (checkemail) {
      return res.redirect("/register?error=Email already exists");
    }
    if (password !== confirmpassword) {
      return res.redirect("/register?error=Passwords do not match");
    }

    await accountmodel.create({
      firstname,
      lastname,
      email,
      password,
    });

    res.redirect("/login?message=Account created successfully, please login");
  } catch (err) {
    console.log(err);
    res.render("500");
  }
};
const logincreate = async (req, res) => {
  try {
    const { error } = validatelogin.validate(req.body);
    if (error) {
      return res.redirect(`/login?error=${error.details[0].message}`);
    }

    const { email, password } = req.body;
    const checkemail = await accountmodel.findOne({ email: email });
    if (!checkemail) {
      return res.redirect("/login?error=Invalid Credentials");
    }
    const compare = await bcrypt.compare(password, checkemail.password)
    if(!compare ){
      return res.redirect("/login?error=Invalid Credentials");
    }
    const token = await jwt.sign({ id: checkemail._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("grostore_cookie", token, {
        maxAge: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
        httpOnly: true,
        // secure: true
    })
    res.redirect("/?message=Account logged in successfully");
  } catch (err) {
    console.log(err);
    res.render("500");
  }
};

module.exports = { getlogin, getRegister, createaccount, logincreate };
