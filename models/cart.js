const mongoose = require('mongoose');

const cartschema = new mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    account:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
    },
    quantity: {
        type: Number,
        default: 1,
    },
    date:{
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('cart', cartschema);