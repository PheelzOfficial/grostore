const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")


const accountschema = new mongoose.Schema({
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
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    image:{
        type: String,
        default: "/profile/default.jpg"
    },
    role: {
        type: String,
        enum: ["buyer", "vendor", "admin", "supervisor"],
        default: "buyer"
    },
    password: {
        type: String,
        required: true,
    },
    
    date:{
        type: Date,
        default: Date.now,
    }
})



accountschema.pre("save", async function(next) {
    if (this.isModified("password")) {
        const salt = bcrypt.genSaltSync(10)
        this.password = await bcrypt.hash(this.password, salt);
    }

    next();
})

module.exports = mongoose.model('Account', accountschema);