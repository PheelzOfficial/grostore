const {getlogin, getRegister, createaccount, logincreate} = require("../controllers/authcontroller")
const express = require("express")
const router = express.Router()


router.get("/login", getlogin)
router.post("/login", logincreate)
router.get("/register", getRegister)
router.post("/register", createaccount)

module.exports = router;