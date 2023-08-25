const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: { type: String},

  email: { type: String},
  phone: { type: Number},

  msg: { type: String},
});

const ContactModel = mongoose.model("Contact", contactSchema);
module.exports = ContactModel;
