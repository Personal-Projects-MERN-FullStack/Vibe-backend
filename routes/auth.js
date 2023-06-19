const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const JWT_SECRET = "vaibahvisgood$boy";

const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
//ROUTE : 1  create a user using: POST /api/auth/CreateUser    // no login required
router.post("/CreateUser", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ error: "Sorry, a user with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({ success: true, authtoken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }
});


//ROUTE : 2 Authonticate a user using : post "api/auth/login"

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can not be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    //if error send and bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success,
          error: "Please try to log in with correct credintials",
        });
      }

      const passwordcompare = await bcrypt.compare(password, user.password);
      if (!passwordcompare) {
        return res.status(400).json({
          success,
          error: "Please try to log in with correct credintials",
        });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      success = false;
      res.status(500).send(success, "Internal server error");
    }
  }
);

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// router.post(
//   "/check",

//   async (req, res) => {
//     let success = false;
//     //if error send and bad request
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ success, errors: errors.array() });
//     }
//     const { email, name } = req.body;
//     try {
//       function getRandomInt(min, max) {
//         min = Math.ceil(min);
//         max = Math.floor(max);
//         return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
//       }
//       let otp = getRandomInt(111111, 999999);
//       let message =
//         "Dear " + name + " Your Verification Code for portal login is " + otp;
//       const msg = {
//         from: "mohanalkarvaibahv@gmail.com",
//         to: email,
//         subject: "Portal Verification Code",
//         text: message,
//       };
//       nodemailer
//         .createTransport({
//           service: "gmail",
//           auth: {
//             user: "mohanalkarvaibhav@gmail.com",
//             pass: "sdsxlvqnevxizocr",
//           },
//           port: 465,
//           host: "smtp.gmail.com",
//         })

//         .sendMail(msg, (err) => {
//           if (err) {
//             return console.log("error occurs", err);
//           } else {
//             console.log("Email sent");
//             success = true;
//           }
//         });

//       res.json({ success, otp });
//     } catch (error) {
//       console.error(error.message);
//       success = false;
//       res.status(500).send(success, "Internal server error");
//     }
//   }
// );

module.exports = router;
