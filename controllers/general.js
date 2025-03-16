const contactmodel = require("../models/contact");
const productmodel = require("../models/products");
const { validateproduct } = require("../middlewares/validate");
const path = require("path");
const fs = require("fs");
const cartmodel = require("../models/cart");
const { uniqueImageName, generateOrderId } = require("../middlewares/unique");

const gethome = async (req, res) => {
  const user = req.user;
  try {
    const cart = await cartmodel.find({ account: user?._id }).populate("product");
    res.render("index", {
      user,
      message: req.query?.message,
      error: req.query?.error,
      cart
    });
  } catch (error) {
    const cart = await cartmodel.find({ account: user?._id }).populate("product");
    res.render("500", { user, cart});
  }
};

const getshop = async (req, res) => {
  const user = req.user;

  try {
    const products = await productmodel.find();
    const cart = await cartmodel.find({ account: user?._id }).populate("product");
    res.render("shop", {
      products,
      user,
      message: req.query?.message,
      error: req.query?.error,
      cart
    });
  } catch (error) {
    const cart = await cartmodel.find({ account: user?._id }).populate("product");
    res.render("500", { user, cart });
  }
};
const getabout = async (req, res) => {
  const user = req.user;

  try {
    const cart = await cartmodel.find({ account: user?._id }).populate("product");
    res.render("about", {cart});
  } catch (error) {
    const cart = await cartmodel.find({ account: user?._id }).populate("product");
    res.render("500", {cart});
  }
};
const getcontact = async (req, res) => {
  const user = req.user;
  try {
    const cart = await cartmodel.find({ account: user?._id }).populate("product");
    res.render("contact", {
      message: req.query?.message,
      error: req.query?.error,
      cart
    });
  } catch (error) {
    const cart = await cartmodel.find({ account: user?._id }).populate("product");
    res.render("500", {cart});
  }
};

const getwishlist = async (req, res) => {
  const user = req.user;
  try {
    const cart = await cartmodel.find({ account: user?._id }).populate("product");
    res.render("wishlist", { user, cart });
  } catch (error) {
    const cart = await cartmodel.find({ account: user?._id }).populate("product");
    res.render("500", { user, cart });
  }
};
const getblog = async (req, res) => {
  const user = req.user;

  try {
    const cart = await cartmodel.find({ account: user?._id }).populate("product");
    res.render("blog", { user, cart });
  } catch (error) {
    const cart = await cartmodel.find({ account: user?._id }).populate("product");
    res.render("500", { user, cart });
  }
};
const getcheckout = async (req, res) => {
  const user = req.user;

  try {
    const cart = await cartmodel.find({ account: user?._id }).populate("product");
    res.render("checkout", { user, cart });
  } catch (error) {
    const cart = await cartmodel.find({ account: user?._id }).populate("product");
    res.render("500", { user, cart });
  }
};
const getcoupon = async (req, res) => {
  const user = req.user;
  try {
    const cart = await cartmodel.find({ account: user?._id }).populate("product");
    res.render("coupon", {cart});
  } catch (error) {
    const cart = await cartmodel.find({ account: user?._id }).populate("product");
    res.render("500", {cart});
  }
};
const getblogdetails = async (req, res) => {
  const user = req.user;
  try {
    const cart = await cartmodel.find({ account: user?._id }).populate("product");
    res.render("blog-details", {cart});
  } catch (error) {
    const cart = await cartmodel.find({ account: user?._id }).populate("product");
    res.render("500", {cart});
  }
};
const getproductdetails = async (req, res) => {
  const user = req.user;

  try {
    const { id } = req.params;
    const cart = await cartmodel.find({ account: user?._id }).populate("product");
    const product = await productmodel.findOne({ _id: id });
    if (!product) {
      return res.redirect("/groceries?error=Product Not found");
    }
    res.render("product-details", { product, user, cart });
  } catch (error) {
    const cart = await cartmodel.find({ account: user?._id }).populate("product");
    res.render("500", { user, cart });
  }
};
const getservice = async (req, res) => {
  const user = req.user;
  try {
    const cart = await cartmodel.find({ account: user?._id }).populate("product");
    res.render("services", { user, cart });
  } catch (error) {
    const cart = await cartmodel.find({ account: user?._id }).populate("product");
    res.render("500", { user, cart });
  }
};
const getservicedetails = async (req, res) => {
  const user = req.user;
  try {
    const cart = await cartmodel.find({ account: user?._id }).populate("product");
    res.render("service-details", {cart});
  } catch (error) {
    const cart = await cartmodel.find({ account: user?._id }).populate("product");
    res.render("500", {cart});
  }
};
const getteam = async (req, res) => {
  const user = req.user;
  try {
    const cart = await cartmodel.find({ account: user?._id }).populate("product");
    res.render("team", {cart});
  } catch (error) {
    const cart = await cartmodel.find({ account: user?._id }).populate("product");
    res.render("500", {cart});
  }
};
const getcampain = async (req, res) => {
  const user = req.user;
  try {
    const cart = await cartmodel.find({ account: user?._id }).populate("product");
    res.render("campaigns", {cart});
  } catch (error) {
    const cart = await cartmodel.find({ account: user?._id }).populate("product");
    res.render("500", {cart});
  }
};
const getcampaindetails = async (req, res) => {
  const user = req.user;
  try {
    const cart = await cartmodel.find({ account: user?._id }).populate("product");
    res.render("campaigns-single", {cart});
  } catch (error) {
    const cart = await cartmodel.find({ account: user?._id }).populate("product");
    res.render("500", {cart});
  }
};

const postmessage = async (req, res) => {
  const user = req.user;
  try {
    const { firstname, lastname, phone, email, message, category } = req.body;
    if (!firstname || firstname.trim() == "") {
      return res.redirect("/contact?error=First Name is required");
    }
    if (!lastname || lastname.trim() == "") {
      return res.redirect("/contact?error=Last Name is required");
    }
    if (!phone || phone.trim() == "") {
      return res.redirect("/contact?error=Phone Number is required");
    }
    if (!message || message.trim() == "") {
      return res.redirect("/contact?error=Message is required");
    }
    if (!category || category.trim() == "") {
      return res.redirect("/contact?error=Category is required");
    }
    if (!email || email.trim() == "") {
      return res.redirect("/contact?error=Email is required");
    }
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!valid.test(email)) {
      return res.redirect("/contact?error=Invalid Email");
    }

    await contactmodel.create({
      firstname,
      lastname,
      phone,
      email,
      message,
      category,
    });

    res.redirect("/contact?message=Message submitted successfully");
  } catch (err) {
    console.log(`Error occured: ${err.message}`);
    res.render("500", { message: "Error Occured while submitting message" });
  }
};

const getaddproduct = async (req, res) => {
  const user = req.user;
  try {
    if (user.role != "admin") {
      return res.redirect("/?error=Unauthorized");
    }
    const cart = await cartmodel.find({ account: user?._id }).populate("product");
    res.render("addproduct", {
      message: req.query?.message,
      error: req.query?.error,
      user,
      cart
    });
  } catch (err) {
    const cart = await cartmodel.find({ account: user?._id }).populate("product");
    console.log(`Error occured: ${err.message}`);
    res.render("500", { message: "Error Occured while adding product", user, cart });
  }
};

const postproduct = async (req, res) => {
  const user = req.user;

  try {
    if (user.role != "admin") {
      return res.redirect("/?error=Unauthorized");
    }
    const { error } = validateproduct.validate(req.body);
    if (error) {
      // console.log(error)
      return res.redirect(`/add-product?error=${error.details[0].message}`);
    }
    const images = req.files?.images;
    if (!images) {
      return res.redirect("/add-product?error=Images are required");
    }
    if (!Array.isArray(images) || images.length < 4) {
      return res.redirect("/add-product?error=Upload atleast 4 images");
    }

    // name = electon.png
    // = ["electon", "png"]
    for (let img of images) {
      const allowedExt = /jpeg|jpg|png/;
      const imgname = img.name;
      const imgExt = imgname.split(".").pop();
      const lowerExt = imgExt.toLowerCase();
      if (!allowedExt.test(lowerExt)) {
        return res.redirect(
          `/add-product?error=Invalid extension for ${imgname}`
        );
      }
    }

    const filesize = images.reduce((acc, val) => acc + val.size, 0);
    const maxsize = 1024 * 1024 * 10;
    if (filesize > maxsize) {
      return res.redirect(`/add-product?error=Images size can not exceed 10mb`);
    }

    let properties = req.body.properties;
    let tags = req.body.tags;

    if (!Array.isArray(properties)) {
      properties = [req.body.properties];
    }
    if (!Array.isArray(tags)) {
      tags = [req.body.tags];
    }
    const filepath = path.join(__dirname, "../public", "products");
    if (!fs.existsSync(filepath)) {
      fs.mkdirSync(filepath);
    }

    // imgArr = ["/products/electon.png", "/products/electon.png", "/products/electon.png", "/products/electon.png"]

    const imgArr = await Promise.all(
      images.map(async (img) => {
        const imgname = img.name;
        const uniquename = await uniqueImageName(imgname);
        const imgdir = path.join(filepath, uniquename);
        await img.mv(imgdir, (err) => {
          if (err) {
            return res.redirect(
              `/add-product?error=Error occured while upload ${imgname}`
            );
          }
        });
        return `/products/${uniquename}`;
      })
    );

    const sku = await generateOrderId();

    await productmodel.create({
      title: req.body.title,
      price: req.body.price,
      stock: req.body.stock,
      description: req.body.description,
      shortdescription: req.body.shortdescription,
      images: imgArr,
      properties: properties,
      tags: tags,
      sku: sku,
      display: imgArr[0],
      category: req.body.category,
      measurement: req.body.measurement,
      measurementtype: req.body.measurementtype,
    });

    res.redirect("/add-product?message=Product Added successfully");
  } catch (err) {
    console.log(`Error occured: ${err}`);
    res.render("500", { message: "Error Occured while adding product", user });
  }
};

module.exports = {
  gethome,
  getteam,
  getshop,
  getproductdetails,
  getblog,
  getblogdetails,
  getcampain,
  getcampaindetails,
  getservice,
  getservicedetails,
  getcontact,
  getwishlist,
  getcoupon,
  getabout,
  getcheckout,
  postmessage,
  getaddproduct,
  postproduct,
};
