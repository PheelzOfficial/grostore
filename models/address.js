const mongoose = require("mongoose");

const addressschema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  addedby:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  aptno: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zipcode:{
    type: Number,
    required: true,
  },
  addresstype:{
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Address", addressschema);
