const mongoose=require('mongoose');

const applicationSchema=new mongoose.Schema(
   {
    jobId:{type:String,ref:"Job"},
    applicantName:String,
    applicantEmail:String,
    appliedOn:{type:Date,default:Date.now},
    status:{type:String,default:"Pending"}
   }
);

module.exports=mongoose.model("Application",applicationSchema);