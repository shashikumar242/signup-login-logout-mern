const express = require("express");
const mongoose = require("mongoose");
const RegisterUser = require("./model");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const middleware = require("./middleware");

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" })); // giving start will success of every request from any server, you if you have domain/server ,you can mention that.

mongoose
  .connect(
    "mongodb+srv://shashikumar242:shashikumar1997@cluster0.y3xtgai.mongodb.net/register-login-jwt-telugu-skillhub?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB connection established");
  })
  .catch(() => {
    console.log("DB connection failed");
  });

app.listen(5000, () => {
  console.log("listening on port 5000...");
});

app.get("/", (req, res) => {
  res.send("Hi i am shashikumar");
});

app.post("/register", async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    const userExist = await RegisterUser.findOne({ email: email });
    if (userExist) {
      return res.status(400).send("User Already Registered");
    }

    if (password !== confirmPassword) {
      return res.status(400).send("Passwords are not matching");
    }

    const newUser = new RegisterUser({
      username,
      email,
      password,
      confirmPassword,
    });

    await newUser.save();
    res.status(200).send("Registered Successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await RegisterUser.findOne({ email: email });

    if (!userExist) {
      return res.status(400).send("User not found");
    }

    if (userExist.password !== password) {
      return res.status(400).send("Invalid password");
    }

    // if user already exists -- it had created an unique id for the user
    const payload = {
      user: {
        id: userExist.id,
      },
    };

    // jwt sign method will take 4 params
    // 1. payload(which is id of that user)
    // 2. key(any random key)
    // 3. expire time
    // 4. if any erro - throw err, if not generate token

    jwt.sign(payload, "jwtSecure", { expiresIn: 3600000 }, (err, token) => {
      if (err) throw err;
      return res.json({ token });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});

app.get("/myprofile", middleware, async (req, res) => {

  try {
    const userExist = await RegisterUser.findById(req.user.id);
    if (!userExist) {
      return res.status(400).send("User not found");
    }

    return res.json(userExist);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});
