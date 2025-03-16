const {
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
} = require("../controllers/general");
const express = require("express");
const router = express.Router();
const { verify, checkuser } = require("../middlewares/verify");

router.get("/", checkuser, gethome);
router.get("/about", checkuser, getabout);
router.get("/add-product", verify, getaddproduct);
router.post("/add-product", verify, postproduct);
router
  .route("/contact")
  .get(checkuser, getcontact)
  .post(checkuser, postmessage);
router.get("/service", checkuser, getservice);
router.get("/service/details", checkuser, getservicedetails);
router.get("/groceries", checkuser, getshop);
router.get("/meat-store", checkuser, getshop);
router.get("/shop", checkuser, getshop);
router.get("/product/:id", checkuser, getproductdetails);
// router.get("/cart", verify, getcart);
router.get("/wishlist", verify, getwishlist);
router.get("/checkout", verify, getcheckout);
router.get("/coupons", verify, getcoupon);
router.get("/blogs", checkuser, getblog);
router.get("/blog/details", checkuser, getblogdetails);
router.get("/campaigns", checkuser, getcampain);
router.get("/team", checkuser, getteam);
router.get("/campaign/:id", checkuser, getcampaindetails);

module.exports = router;
