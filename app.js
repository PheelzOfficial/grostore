const express = require("express");
const app = express();
const exphs = require("express-handlebars");
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const expfileupld = require("express-fileupload");
const generalroutes = require("./routes/general");
const authroutes = require("./routes/auth");
const productroutes = require("./routes/product");
const cookieparser = require("cookie-parser");

// connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.error("Error connecting to DB", err);
  });

// setup template engine
app.engine(
  "hbs",
  exphs.engine({
    extname: ".hbs",
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
    helpers: {
      adminaccess: function (user) {
        if (!user) {
          return false;
        } else {
          if (user.role === "admin") {
            return true;
          } else {
            return false;
          }
        }
      },
      cartlength:(cart)=>{
        if (!cart) {
          return 0;
        } else {
          return cart.length;
        }
      },
      sumtotal: (cart) => {
        let sum = 0;
        for (let item of cart) {
          sum += item.product.price * item.quantity;
        }
        return sum.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      },
      checkempty: (cart) => {
        if (!cart) {
          return true;
        }
        if (cart.length === 0) {
          return true;
        } else {
          return false;
        }
      },
      totalsum: (quantity, price) => {
        const sum = quantity * price;
        return sum.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      },
      formatprice: (price) => {
        return price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      },
    },
  })
);

// setup view engine
app.set("view engine", "hbs");

// create middlewares
app.use(expfileupld());
app.use(cookieparser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", generalroutes);
app.use("/", authroutes);
app.use("/", productroutes);

app.all("*", (req, res) => {
  res.render("404");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
