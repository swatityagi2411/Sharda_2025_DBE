const mongoose=require('mongoose');

//define schema which is similar to that we had already created
const jobSchema=new mongoose.Schema({
    _id:String,
    title:String,
    location:String,
    experience:Number,
    salary:Number,
    skills:[String]
});

module.exports=mongoose.model("Job",jobSchema);