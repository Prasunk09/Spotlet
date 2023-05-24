const express = require("express");
const mongoose = require("mongoose");
const Signupuser = require("./model");
const jwt = require("jsonwebtoken");
const middleware = require("./middleware");
const cors = require("cors");
const app = express();

mongoose
  .connect(
    "mongodb+srv://prasu1511102:zqsu8fRzAQFwjTS8@cluster0.ndn306s.mongodb.net/spotlet-auth?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB Connection established"));

app.use(express.json());

app.use(cors({ origin: "*" }));

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, mobileNumber, email, password } = req.body;
    let exist = await Signupuser.findOne({ email });
    if (exist) {
      return res.status(400).send("User Already Exist");
    }

    let newUser = new Signupuser({
      firstName,
      lastName,
      mobileNumber,
      email,
      password,
    });
    await newUser.save();
    res.status(200).send("Registered Successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internel Server Error");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let exist = await Signupuser.findOne({ email });
    if (!exist) {
      return res.status(400).send("User Not Found");
    }
    if (exist.password !== password) {
      return res.status(400).send("Invalid credentials");
    }
    let payload = {
      user: {
        id: exist.id,
      },
    };
    jwt.sign(payload, "jwtSecret", { expiresIn: 3600000 }, (err, token) => {
      if (err) throw err;
      return res.json({ token });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});

app.get("/myprofile", middleware, async (req, res) => {
  try {
    let exist = await Signupuser.findById(req.user.id);
    if (!exist) {
      return res.status(400).send("User not found");
    }
    res.json(exist);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});

app.listen(5000, () => {
  console.log("Server running in 5000...");
});
