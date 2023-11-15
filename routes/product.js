var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    ownerId:{
          type: mongoose.Schema.Types.ObjectId, 
          ref:"user"
     },
     reviews: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "review",
        },
      ],
   
    productName:String,
     pic:{
        type:Array,
        default:[]
     },     
     Des:String,
     Highlits:String,
     bolt:String,
     Price:Number,
     weight:Number,
     height:Number,
     Length:Number,
     width:Number,
     Availability:String,
     updatedPrice:Number,
     

    //  picId:String,  
},{timestamps:true,})

module.exports = mongoose.model("product", productSchema);
