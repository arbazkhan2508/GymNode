var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
    
    user: String, 
    firstname:String,
    lastname:String,
    email:String,
    productimg:String, 
    productname:String,
    stars: { type: Number, min: 1, max: 5 },  // Rating (1 to 5 stars)
    comment: String,   // Review comment

},{timestamps:true,})

module.exports = mongoose.model("review", reviewSchema);
