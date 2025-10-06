const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://swatityagidgi:admin123@swaticluster.5axzawy.mongodb.net/UserDB?retryWrites=true&w=majority&appName=SwatiCluster');

const userSchema= new mongoose.Schema(
    {
     name:String,
     age:Number,
     contact:Number   
    }
);

const User=mongoose.model('User',userSchema);
const user=new User({name:"John",age:25,contact:999999999});
user.save().then(()=>console.log("User update"));