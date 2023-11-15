var express = require("express");
var router = express.Router();
var userModel = require("./users");
var productModel = require("./product");
var cartModel = require("./cart");
var passport = require("passport");
var mongoose = require("mongoose");
const multer = require("multer");
var Razorpay = require("razorpay");
const config = require("../config/config");
var fs = require("fs");
const localStrategy = require("passport-local");
const mailer = require("../nodemailer");
const mailer1 = require("../nodemailer1");
const mailer2 = require("../nodemailer2");
const Review = require('./review')
const crypto = require("crypto");

const userimagesupload = multer({ storage: config.userimagesstorage });
const productimagesupload = multer({ storage: config.productstorage });
const reviewimagesupload = multer({ storage: config.reviewstorage });

// route

passport.use(
  new localStrategy(
    {
      usernameField: "email",
      usernameQueryFields: ["email"],
    },
    userModel.authenticate()
  )
);

//  razorpay poayment

//razorpay instance
var instance = new Razorpay({
  key_id: "rzp_test_e0p4ROsVzyQ7xL",
  key_secret: "DwGCKSi05b7yDJc6VijYVM6Y",
});

router.get("/success", function (req, res) {
  res.render("success");
});

router.post("/create/orderId", function (req, res) {
  var options = {
    amount: 50000, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  instance.orders.create(options, function (err, order) {
    console.log(order);
    res.send(order);
  });
});

router.post("/api/payment/verify", (req, res) => {
  let body =
    req.body.response.razorpay_order_id +
    "|" +
    req.body.response.razorpay_payment_id;

  var crypto = require("crypto");
  var expectedSignature = crypto
    .createHmac("sha256", "DwGCKSi05b7yDJc6VijYVM6Y")
    .update(body.toString())
    .digest("hex");
  console.log("sig received ", req.body.response.razorpay_signature);
  console.log("sig generated ", expectedSignature);
  var response = { signatureIsValid: "false" };
  if (expectedSignature === req.body.response.razorpay_signature)
    response = { signatureIsValid: "true" };
  res.send(response);
});

//  razorpay poayment

// googlee authenticate

const GoogleStrategy = require("passport-google-oidc");

require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env["GOOGLE_CLIENT_ID"],
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
      callbackURL: "/oauth2/redirect/google",
      scope: ["email", "profile"],
    },
    async function verify(issuer, profile, cb) {
      console.log(profile);
      let user = await userModel.findOne({ email: profile.emails[0].value });
      if (user) {
        return cb(null, user);
      } else {
        let newUser = await userModel.create({
          name: profile.displayName,
          email: profile.emails[0].value,
        });
        newUser.save();
        return cb(null, newUser);
      }
    }
  )
);

router.get("/login/federated/google", passport.authenticate("google"));

router.get("/oauth2/redirect/google",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);


// googlee authenticate

/* GET home page. */

router.get("/", async function (req, res) {
  if (req.isAuthenticated()) {
    const product = await productModel.find({});
    const randomproduct = getRandomSubset(product, 10);
    let reviews = await Review.find().limit(20).skip(0)
    // let user = await userModel.findOne({ email: req.user.email });
    let user = await userModel.findOne({ email: req.user.email }).populate({
      path: "carts",
      populate: {
        path: "productId",
      },
    });
    res.render("home", { user: user,randomproduct:randomproduct,reviews:reviews });
  } else {
    const product = await productModel.find({});
    let reviews = await Review.find().limit(20).skip(0)
    const randomproduct = getRandomSubset(product, 10);
    res.render("home", { user: null ,randomproduct:randomproduct,reviews:reviews  });
  }
});

router.get('/nordic',async function(req,res){
  if (req.isAuthenticated()) { 
    try {
    
      let user = await userModel.findOne({ email: req.user.email }).populate({
        path: "carts",
        populate: {
          path: "productId",
        },
      });
      const searchTerm = "Nord"||"nord"; // Get the search term from the query string

      
      // Use a regex to find users whose 'name' field contains the search term
      const products = await productModel.find({ productName: { $regex: searchTerm, $options: 'i' } });
  
      res.render('nordic', { products:products,user:user });
    } catch (err) {
      res.status(500).json({ message: 'Error searching users' });
    }
  } else {
    const searchTerm = "Nord"||"nord"; // Get the search term from the query string

    const products = await productModel.find({ productName: { $regex: searchTerm, $options: 'i' } });
    res.render("nordic", { user: null ,products:products,user:null  });
  }
  
 
})

router.get('/tib',async function(req,res){
  if (req.isAuthenticated()) { 
    try {
    
      let user = await userModel.findOne({ email: req.user.email }).populate({
        path: "carts",
        populate: {
          path: "productId",
        },
      });
     const searchTerm = "tib"||"Tib";  // Get the search term from the query string

      
      // Use a regex to find users whose 'name' field contains the search term
      const products = await productModel.find({ productName: { $regex: searchTerm, $options: 'i' } });
  
      res.render('tib', { products:products,user:user });
    } catch (err) {
      res.status(500).json({ message: 'Error searching users' });
    }
  } else {
   const searchTerm = "tib"||"Tib";  // Get the search term from the query string

    const products = await productModel.find({ productName: { $regex: searchTerm, $options: 'i' } });
    res.render("tib", { user: null ,products:products,user:null  });
  }
  
 
})


router.get('/sb',async function(req,res){
  if (req.isAuthenticated()) { 
    try {
    
      let user = await userModel.findOne({ email: req.user.email }).populate({
        path: "carts",
        populate: {
          path: "productId",
        },
      });

      const searchTerm = "SLANT"||"Slant"||"slant"; // Get the search term from the query string
      
      // Use a regex to find users whose 'name' field contains the search term
      const products = await productModel.find({ productName: { $regex: searchTerm, $options: 'i' } });
  
      res.render('sb', { products:products,user:user });
    } catch (err) {
      res.status(500).json({ message: 'Error searching users' });
    }
  } else {
    const searchTerm = "SLANT"||"Slant"||"slant"; // Get the search term from the query string
    const products = await productModel.find({ productName: { $regex: searchTerm, $options: 'i' } });
    res.render("sb", { user: null ,products:products,user:null  });
  }
  
 
})

router.get('/acc',async function(req,res){
  if (req.isAuthenticated()) { 
    try {
    
      let user = await userModel.findOne({ email: req.user.email }).populate({
        path: "carts",
        populate: {
          path: "productId",
        },
      });
      const searchTerm = "WEIGHT"||"weight"||"Weight"||"Reverse"||"reverse"||"Reverse"; // Get the search term from the query string

      
      // Use a regex to find users whose 'name' field contains the search term
      const products = await productModel.find({ productName: { $regex: searchTerm, $options: 'i' } });
  
      res.render('acc', { products:products,user:user });
    } catch (err) {
      res.status(500).json({ message: 'Error searching users' });
    }
  } else {
    const searchTerm = "WEIGHT"||"weight"||"Weight"||"Reverse"||"reverse"||"Reverse"; // Get the search term from the query string
    const products = await productModel.find({ productName: { $regex: searchTerm, $options: 'i' } });
    res.render("acc", { user: null ,products:products,user:null  });
  }
  
 
})

router.get("/updateproduct/:id", async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email });
  let product = await productModel.findOne({ _id: req.params.id });
  res.render("updateproduct", { user: user, product: product });
});

router.get("/deleteproduct/:id", async function (req, res) {
  let id = req.params.id;
  let user = await userModel.findOne({ email: req.user.email });
  let product = await productModel.findOneAndDelete({ _id: req.params.id });
  user.Products.splice(id,1);
  await user.save;
  res.redirect("back");
});

router.get("/ourproduct", async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email });
  let allproduct = await productModel.find();

  res.render("ourproduct", { user: user, allproduct: allproduct });
});

router.get("/allproducts", async function (req, res) {
  if (req.isAuthenticated()) {
    let user = await userModel.findOne({ email: req.user.email }).populate({
      path: "carts",
      populate: {
        path: "productId",
      },
    });
    let allproduct = await productModel.find();
    res.render("Allproduct", { user: user, allproduct: allproduct });
  } else {
    let allproduct = await productModel.find();
    res.render("Allproduct", { user: null, allproduct: allproduct });
  }
});

router.get("/single/:id", async function (req, res) {
  if (req.isAuthenticated()) {
    let user = await userModel.findOne({ email: req.user.email }).populate({
      path: "carts",
      populate: {
        path: "productId",
      },
    });
    let product = await productModel.findOne({ _id: req.params.id }).populate('reviews')
    let allproduct = await productModel.find().limit(3).skip(0);
    const users = await productModel.find({});
    const randomSubset = getRandomSubset(users, 3);
    let count = 1;
    res.render("singleproduct", {
      user: user,
      product: product,
      allproduct: allproduct,
      randomSubset: randomSubset,
      count: count,
    });
  } else {
    let product = await productModel.findOne({ _id: req.params.id }).populate('reviews')
    let allproduct = await productModel.find().limit(3).skip(0);
    const users = await productModel.find({});
    const randomSubset = getRandomSubset(users, 3);
    let count = 1;
    res.render("singleproduct", {
      user: null,
      product: product,
      allproduct: allproduct,
      randomSubset: randomSubset,
      count: count,
    });
  }
});

router.get("/single", async function (req, res) {
  if (req.isAuthenticated()) {
    let user = await userModel.findOne({ email: req.user.email }).populate({
      path: "carts",
      populate: {
        path: "productId",
      },
    });
    var pname = "The Torque Bar";
    let product = await productModel.findOne({productName:pname});
    let allproduct = await productModel.find().limit(3).skip(0);
    const users = await productModel.find({});
    const randomSubset = getRandomSubset(users, 3);
    let count = 1;
    res.render("single", {
      user: user,
      product: product,
      allproduct: allproduct,
      randomSubset: randomSubset,
      count: count,
    });
  } else {
    let product = await productModel.findOne({productName:pname});
    let allproduct = await productModel.find().limit(3).skip(0);
    const users = await productModel.find({});
    const randomSubset = getRandomSubset(users, 3);
    let count = 1;
    res.render("singleproduct", {
      user: null,
      product: product,
      allproduct: allproduct,
      randomSubset: randomSubset,
      count: count,
    });
  }
});

// Function to get a random subset of users

function getRandomSubset(array, size) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
}

// Function to get a random subset of users

router.get("/profile", async function (req, res, next) {
  if (req.isAuthenticated()) {
    let user = await userModel.findOne({ email: req.user.email });
    res.render("Myprofile", { user });
  } else {
    res.redirect("/login");
  }
});

router.post("/update", isLoggedIn, function (req, res) {
  userModel
    .findOneAndUpdate(
      { email: req.user.email },
      {
        name: req.body.firstname,
        lastname: req.body.lastName,
        contactnumber: req.body.phoneNumber,
        Address1: req.body.Add1,
        Address2: req.body.Add2,
        City: req.body.city,
        Zipcode: req.body.zp,
      }
    )
    .then(function () {
      res.redirect("/profile");
    });
});

// router.post("/updateproduct/:id", async function (req, res) {
//  let upd = await productModel.findOneAndUpdate(
//       { _id: req.params.id },
//       {
//         productName: req.body.Pn,
//         Price: req.body.price,
//         weight: req.body.weight,
//         height: req.body.height,
//         Length: req.body.length,
//         width: req.body.width,
//         Availability: req.body.Availability,
//         updatedPrice: req.body.updatedPrice,
//         bolt: req.body.bolt,
//         Des: req.body.Des,
//         Highlits: req.body.Highlits,
//       }
//     )

//   res.redirect("/profile");
// });

router.post("/updateproduct/:id", async function (req, res) {
  try {
    const productId = req.params.id;
    const updateFields = {};
    if (req.body.Pn) {
      updateFields.productName = req.body.Pn;
    }
    if (req.body.price) {
      updateFields.Price = req.body.price;
    }
    if (req.body.weight) {
      updateFields.weight = req.body.weight;
    }
    if (req.body.height) {
      updateFields.height = req.body.height;
    }
    if (req.body.length) {
      updateFields.Length = req.body.length;
    }
    if (req.body.width) {
      updateFields.width = req.body.width;
    }
    if (req.body.Availability) {
      updateFields.Availability = req.body.Availability;
    }
    if (req.body.updatedPrice) {
      updateFields.updatedPrice = req.body.updatedPrice;
    }
    if (req.body.bolt) {
      updateFields.bolt = req.body.bolt;
    }
    if (req.body.Des) {
      updateFields.Des = req.body.Des;
    }
    if (req.body.Highlits) {
      updateFields.Highlits = req.body.Highlits;
    }
    //
    const updatedProduct = await productModel.findByIdAndUpdate(productId, { $set: updateFields }, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.redirect("/profile");

  } catch (error) {
    console.log(error);
  }

});

// /update photu/

router.post("/uploadphotu",
  isLoggedIn,
  userimagesupload.single("filenames"),
  async function (req, res) {
    let user = await userModel.findOne({ email: req.user.email });
    user.userProfileimg = req.file.filename;
    user.save();
    res.redirect("back");
  }
);

// update photu

router.post("/createproduct",isLoggedIn,productimagesupload.array("productphoto", 5),
  async function (req, res) {
    const loginuser = await userModel.findOne({ email: req.user.email });

    let createProduct = await productModel.create({
      productName: req.body.Pn,
      Price: req.body.price,
      Availability: req.body.Availability,
      bolt: req.body.bolt,
      Des: req.body.Des,
      weight: req.body.weight,
      height: req.body.Highlits,
      length: req.body.length,
      width: req.body.width,
      ownerId: loginuser._id,
      pic: req.files.map((pic) => pic.filename),
    });
    loginuser.Products.push(createProduct);
    await loginuser.save();
    res.redirect("/");
  }
);

router.post("/cart/:id", isLoggedIn, async function (req, res) {
  const data = req.body.data;
  console.log(data, "uts data");
  var product = req.params.id;
  let user = await userModel.findOne({ email: req.user.email });
  let createcart = await cartModel.create({
    ownerId: user._id,
    productId: req.params.id,
    quantity: data,
  });

  user.carts.push(createcart);
  await user.save();
  res.redirect("back");
});

router.get("/remove/cart/:id", isLoggedIn, async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email });
  let id = req.params.id;
  console.log("deleted");
  console.log(id, "its an id");
  var index = user.carts.indexOf(req.params.id);
  user.carts.splice(index, 1);
  let deletecart = cartModel.findOneAndDelete({ _id: req.params.id });
  await user.save();
  res.redirect("back");
});

router.post("/updatecount/:id", async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email });
  let update = await cartModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      quantity: req.body.quantity,
    }
  );
  res.redirect("back");
});

router.get("/checkout", async function (req, res, next) {
  let user = await userModel.findOne({ email: req.user.email }).populate({
    path: "carts",
    populate: {
      path: "productId",
    },
  });
  res.render("checkout", { user: user });
});

router.get("/cart", async function (req, res, next) {
  let user = await userModel.findOne({ email: req.user.email }).populate({
    path: "carts",
    populate: {
      path: "productId",
    },
  });
  let product = await productModel.findOne({ _id: req.params.id });
  let allproduct = await productModel.find().limit(3).skip(0);
  const users = await productModel.find({});
  const randomSubset = getRandomSubset(users, 3);
  let count = 1;
  res.render("cart", {
    user: user,
    product: product,
    allproduct: allproduct,
    randomSubset: randomSubset,
    count: count,
  });
});

router.get("/addproduct", async function (req, res, next) {
  let user = await userModel.findOne({ email: req.user.email });
  res.render("Addproduct", { user: user });
});

router.get("/orders", async function (req, res, next) {
  let user = await userModel.findOne({ email: req.user.email }).populate({
    path: "Orders",
    populate: {
      path: "productId",
    },
  });
  res.render("orders", { user });
});

router.post("/register", function (req, res) {
  var userdata = new userModel({
    name: req.body.name,
    email: req.body.email,
    contactnumber: req.body.phoneNumber,
  });
  userModel.register(userdata, req.body.password).then(function (u) {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/");
    });
  });
});

router.post("/login",passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  }),
  function (req, res) {}
);

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.clearCookie("connect.sid");
    delete req.session;
    res.redirect("/");
  });
});

// / route

router.get("/login", function (req, res) {
  res.render("login",{user:null});
});

router.get("/sign", function (req, res) {
  res.render("sign", { user: null });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

function isLoggedout(req, res, next) {
  if (req) {
    res.redirect("/home");
  } else {
    return next();
  }
}

// forgot pass

router.get("/forgot", function (req, res) {
  res.render("forgot");
});

router.post("/forgot", async function (req, res) {
  let user = await userModel.findOne({ email: req.body.email });
  if (user) {
    crypto.randomBytes(17, async function (err, buff) {
      var rnstr = buff.toString("hex");
      (user.token = rnstr), (user.expiringTime = Date.now() + 3000000);
      await user.save();
      mailer(req.body.email, user._id, user.name, rnstr).then(function () {
        console.log("send mail!");
      });
    });
  } else {
    res.send("no account!");
  }
});

router.get("/reset/:userid/:token", async function (req, res) {
  let user = await userModel.findOne({ _id: req.params.userid });

  if (user.token === req.params.token && user.expiringTime > Date.now()) {
    res.render("newpass", { id: req.params.userid });
  } else {
    res.send("link expired!");
  }
});

router.post("/reset/:id", async function (req, res) {
  let user = await userModel.findOne({ _id: req.params.id });
  user.setPassword(req.body.newpassword, async function () {
    user.otp = "";
    await user.save();
    res.redirect("/");
  });
});

// forgot pass

router.post("/confirm/booking", async function (req, res) {
  try {
    let user = await userModel.findOne({ email: req.user.email })
    if (user) {
     
      user.carts.forEach(async (bookingId) => {
        if(!user.Orders.includes(bookingId)){
          user.Orders.push(bookingId); // Move the booking to the orders array
          user.carts = [];
        }else{
        }
      });
      crypto.randomBytes(17, async function (err, buff) {
        var rnstr = buff.toString("hex");
        await user.save();
        mailer1(user.email, user._id, user.name, rnstr).then(function () {
          res.redirect('/')
        });
      });
      
      // await user.save();
      // res.redirect('/')
    } else {
      res.send("no account!");
    }
  } catch (err) {
  
    console.error('Error:', err);
  }

});

router.get("/search/:value", async function (req, res) {
  const regex = new RegExp(req.params.value, "i");
  const users = await productModel.find({
    $or: [{ productName: regex }],
  });
  res.json({ avail: users });
});


//review 

// Route to display the review form

router.get('/review', (req, res) => {
  res.render('review_form1');
});



// Route to handle submitting the review form
router.post('/review',reviewimagesupload.single("reviewphoto") ,async (req, res) => {
  let user = await userModel.findOne({email:req.user.email});
  let product = await productModel.findOne({productName:req.body.productname});
  // Extract the review data from the form
  const { productname,firstname,lastname,email,stars, comment } = req.body;

  // Create a new review object based on the form data
  let newReview = await Review.create({
    user: user._id,
    stars: parseInt(stars),
    comment: comment,
    firstname:firstname,
    lastname:lastname,
    productname:productname,
    email:email,
    productimg : req.file.filename,

  });

     user.reviews.push(newReview);
     product.reviews.push(newReview);
    //  loginuser.Products.push(createProduct);
    newReview.save();
   await user.save();
   await product.save();
    res.redirect('/reviews')
});

// Route to display all reviews


//review

module.exports = router;
