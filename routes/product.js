const {addcart, getcart, deletecart, deleteAllCart} = require("../controllers/product")
const express = require("express")
const router = express.Router()
const { verify, checkuser } = require("../middlewares/verify");


router.get("/cart/:sku", verify, addcart)
router.get("/cart", verify, getcart)
router.get("/delete-cart/:id", verify, deletecart)
router.get("/delete-cart", verify, deleteAllCart)

module.exports = router;