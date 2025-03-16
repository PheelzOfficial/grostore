const mongoose = require('mongoose');


const contactschema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Contact', contactschema);