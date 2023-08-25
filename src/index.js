const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const fs = require("fs");
require("./connection/connection");
const multer = require("multer");
const cors = require("cors");
const property = require("./model/property.js");
const Contact = require("./model/contact.js");
const login = require("./model/login.js");
const port = process.env.PORT || 5000;
app.use(multer().any());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("hello node is running");
});
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/create", (req, res) => {
  console.log(req.body);
  const newData = {
    type: req.body.type,

    location: req.body.location,
    place: req.body.place,
    img: req.body.testImage,
    price: req.body.price,
    name: req.body.name,
    address: req.body.address,
  };

  property
    .create(newData)
    .then((createdProperty) => {
      console.log("Property created:", createdProperty);
      res.send("Property created successfully.");
    })
    .catch((error) => {
      console.error("Error creating property:", error);
      res.status(500).send("Error creating property.");
    });
});

app.post("/updatProperties/:id", (req, res) => {
  const id = req.params.id;
  property
    .findByIdAndUpdate(
      { _id: id },
      {
        type: req.body.type,

        location: req.body.location,
        place: req.body.place,
        img: req.body.testImage,
        price: req.body.price,
        name: req.body.name,
        address: req.body.address,
      }
    )
    .then((pro) => res.json(pro))
    .catch((err) => res.json(err));
});

app.delete("/deleteProperties/:id", (req, res) => {
  const id = req.params.id;
  property
    .findByIdAndDelete({ _id: id })
    .then((pro) => res.json(pro))
    .catch((err) => res.json(err));
});

app.get("/getData", async (req, res) => {
  let query = req.query;
  data = await property.find(query);
  res.send(data);
});

app.get("/getDataById/:id", (req, res) => {
  const id = req.params.id;
  property
    .findById({ _id: id })
    .then((pro) => res.json(pro))
    .catch((err) => res.json(err));
});

app.get("/getAdmin", async (req, res) => {
  let query = req.query;
  data = await login.find(query);
  res.send(data);
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nr470245@gmail.com",
    pass: "wcozppyuwxgtfhcs",
  },
});

app.post("/contact", (req, res) => {
  console.log(req.body);
  const newContact = {
    name: req.body.name,

    email: req.body.email,
    phone: req.body.phone,

    msg: req.body.msg,
  };

  if (!newContact.name) {
    return res.json({ status: false, message: "Name field is required" });
  } else if (!newContact.email) {
    return res.json({ status: false, message: "Email field is required" });
  } else if (!newContact.phone) {
    return res.json({ status: false, message: "Phone field is required" });
  } else if (newContact.phone.length < 10) {
    return res.json({ status: false, message: "There should be 10 digits" });
  } else if (!newContact.msg) {
    return res.json({ status: false, message: "Message field is required" });
  }

  Contact.create(newContact)
    .then((createdContact) => {
      console.log("Contact created:", createdContact);

      const mailOptions = {
        from: "rajrajbhar682@gmail.com", // Sender's email address
        to: newContact.email, // Recipient's email address from the contact form
        subject: "Thank you for contacting us",
        text: "We have received your message and will get back to you soon.",
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });

      res.json({ status: true, message: "data created sucessfully" });
    })
    .catch((error) => {
      console.error("Error creating Contact:", error);
      res.status(500).send("Error creating Contact.");
      res.json({ status: false, message: "data not sucessfully" });
    });
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

app.post("/login", (req, res) => {
  console.log(req.body);
  const adminData = {
    userId: req.body.userId,
    password: req.body.password,
  };

  if (!adminData.userId) {
    return res.json({ status: false, message: "UserId field is required" });
  } else if (!adminData.password) {
    return res.json({ status: false, message: "Password field is required" });
  }

  login
    .create(adminData)
    .then((admin) => {
      console.log("details added", admin);

      res.json({ status: true, message: "details created sucessfully" });
    })
    .catch((error) => {
      console.error("Error creating details :", error);
      res.status(500).send("Error creating details.");
      res.json({ status: false, message: "details not sucessfully" });
    });
});
