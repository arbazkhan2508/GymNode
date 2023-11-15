const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/Gym")
  .then(function (connected) {
    console.log("connected!");
  })
  .catch((err) => {
    console.log(err);
  });

let userSchema = mongoose.Schema(
  {

    Products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],

    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "review",
      },
    ],

    Orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cart",
      },
    ],
    
    email: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    lastname:{
      type: String,
    },
    userProfileimg: String,
   
    contactnumber: Number,
    token: {
      type: String,
      default: "",
    },
    expiringTime: String,
    password: String,
    Admin:{ type: Boolean, default: false },
    Address1: String,
    Address2:String,
    City:String,
    countyr:String,
    State:String,
    Zipcode:Number,
    carts:[{type:mongoose.Schema.Types.ObjectId, ref: "cart"}]
  },
  { timestamps: true }
);
userSchema.plugin(plm, { usernameField: "email" });
// userSchema.plugin(findOrCreate);
module.exports = mongoose.model("user", userSchema);
