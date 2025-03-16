const mongoose = require("mongoose");

const productschema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  shortdescription: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  properties: [
    {
      type: String,
      required: true,
    },
  ],
  ratings: {
    type: Number,
    default: 0,
  },
  measurementtype: {
    type: String,
    required: true,
  },
  measurement: {
    type: Number,
    required: true,
  },
  currentprice: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  tags: [
    {
      type: String,
      required: true,
    },
  ],
  images: [
    {
      type: String,
      required: true,
    },
  ],
  display: {
    type: String,
    required: true,
  },
  refund: {
    type: Boolean,
  },
  freeshipping: {
    type: Number,
  },
  color: [
    {
      type: String,
    },
  ],
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productschema);
