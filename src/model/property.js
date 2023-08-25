const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  type: { type: String, required: true },

  location: { type: String, required: true },
  place: { type: String, required: true },
  img: {
    type: String,
  },
  price: { type: Number, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
});

// Create the Property model
const property = mongoose.model("property", propertySchema);

// Export the model
module.exports = property;
