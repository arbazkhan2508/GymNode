var mongoose = require('mongoose');

var cartSchema = mongoose.Schema({
    ownerId:{
          type: mongoose.Schema.Types.ObjectId, 
          ref:"user"
     },
     productId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:"product"
     },
     quantity:Number,
     
},{timestamps:true,})

module.exports = mongoose.model("cart", cartSchema);
