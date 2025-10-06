const express=require('express');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const Product=require("./Product1");
const app=express();
app.use(bodyparser.json());

const uri='';

mongoose.connect(uri)
.then(()=>console.log('database Connected'))
.catch((err)=>console.error("Connection error",err));

//Create a new product
app.post('/products',async(req,res)=>{
    try{
        const product=new Product(req.body);
        await product.save();
        res.status(200),send(product);
        
    }catch(err){res.status(404).send(err);}
})

//Get all products
app.get('/products',async(req,res)=>{
    const products=await Product.find();
    res.send(products);
})
// Get product by Id
app.get('/products/:id',async(req,res)=>{
    const products=await Product.findById(req.params.id);
    if(products) res.send(products);
    else res.status(404).send({error:"Product not found"});
})

//Update product by id
app.put("/products/:id",async(req,res)=>{
    const product=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.send(product);
})


//delete Product
app.delete("/products/:id",async(req,res)=>{
    await Product.findByIdAndDelete(req.params.id);
    res.send({message:"Product Deleted "});
})
const PORT=3000;
app.listen(PORT,()=>{console.log('Server is listening')});