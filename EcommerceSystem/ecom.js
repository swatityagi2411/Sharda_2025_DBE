const {MongoClient}=require('mongodb');

const uri= ;
const client=new MongoClient(uri);

const customers=[
    {name:"John",email:"john@example.com",city:"Pune"},
    {name:"Ritchie",email:"ritch@gmail.com",city:"delhi"},
    {name:"Smith",email:"sm@example.com",city:"Mumbai"},
]

const order=[
    {productname:"Laptop",price:30000,email:"john@example.com"},
    {productname:"Blender",price:10000,email:"ritch@gmail.com"},
    {productname:"Hair Dryer",price:5000,email:"john@example.com"},
]

async function populateDB(){
try{
  await client.connect();
  const db=client.db("ecommerce");//it will create database with name ecommerce
  const customerCollection=db.collection("Customers");
  const orderCollection=db.collection("orders");


//insert one document
await customerCollection.insertOne(
    {
        name:"David",
        email:"david@example.com",
        city:"Banglore",
    }
);

console.log("one Customer added");

//Insert Many document
await customerCollection.insertMany(customers);
console.log("Multiple customer created");


//Fetch documents
const allCustomers=await customerCollection.find().toArray();//db.orders.find()
const allOrders=await orderCollection.find().toArray();
console.log("Customers",allCustomers);
console.log("orders",allOrders);
}catch(err)
{
    console.error(err);
}finally{ await client.close();}
}
populateDB();
