const productmodel = require("../models/products");
const accountmodel = require("../models/account");
const cartmodel = require("../models/cart");

const addcart = async(req, res)=>{
    try {
        const sku = req.params.sku
        if(!sku){
            return res.redirect("/groceries?error=Invalid Product")
        }
        const product = await productmodel.findOne({sku})
        if(!product){
            return res.redirect("/groceries?error=Product Not found")
        }
        const user = req.user
        await cartmodel.create({
            account: user._id,
            product: product._id,
        })
        res.redirect(`/groceries?message=${product.title} added to cart`)

    } catch (err) {
        console.log(`Error occured: ${err.message}`)
        res.render("500", {message: "Error Occured while adding product to cart"})
    }
}

const getcart = async (req, res) => {
    const user = req.user;
    try {
        const cart = await cartmodel.find({ account: user._id }).populate("product");
        // console.log(cart)
        res.render("cart", { user, cart})
    } catch (error) {
        const cart = await cartmodel.find({ account: user._id }).populate("product");

      res.render("500", { user, cart });
    }
  };

  const deletecart = async(req, res)=>{
    try {
        const cartid = req.params.id
        await cartmodel.findByIdAndDelete(cartid)
        res.redirect("/cart?message=Product removed from cart")
    } catch (err) {
        console.log(`Error occured: ${err.message}`)
        const cart = await cartmodel.find({ account: user._id }).populate("product");
        res.render("500", {message: "Error Occured while deleting product from cart", cart})
    }
  }

  const deleteAllCart = async(req, res)=>{
    const user = req.user;
    try {
        await cartmodel.deleteMany({account: user._id})
        res.redirect("/cart?message=Products cleared from cart")
    } catch (err) {
        console.log(`Error occured: ${err.message}`)
        const cart = await cartmodel.find({ account: user._id }).populate("product");
        res.render("500", {message: "Error Occured while clearing products from cart", cart, user})
    }
  }




module.exports = {
    addcart,
    getcart,
    deletecart,
    deleteAllCart
}