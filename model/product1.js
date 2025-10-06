const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    productid:Number,
    name:String,
    category:String,
    stock:Number,
    price:Number,
    
});



module.exports=mongoose.model("Product1",productSchema);