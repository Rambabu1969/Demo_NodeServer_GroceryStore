//npm install express
var express = require('express');
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Default Route
app.get('/', function (req, res) {
     res.send('<h1>Hello MongoDB</h1>');
  })
  
//working with MongoDB
//npm install mongodb
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;

var url = "mongodb://localhost:27017/mru";

//Create Connection
var db;
MongoClient.connect(url, function(err, dbCollection) {
  if (err) throw err;

  console.log("Database Connected!");
  db = dbCollection.db("mru");
});

//Get Method - Data: http://localhost:8080/mongoDB/customer
app.get("/mongoDB/customer", function(req , res){
  
  db.collection("customers").findOne({}, function(err, data) {
    if (err) throw err;

    res.send(data);
  });
  
});

//Get Method - Data: http://localhost:8080/mongoDB/customers
app.get("/mongoDB/customers", function(req , res){

  db.collection("customers").find({}).toArray(function(err, data) {
    if (err) throw err;

    res.send(data);
  });
  
});

//Get Method - Data: http://localhost:8080/mongoDB/customers/noOfRecords
app.get("/mongoDB/customers/:noOfRecords", function(req , res){

  db.collection("customers").find({}).limit(parseInt(req.params.noOfRecords)).toArray(function(err, data) {
    if (err) throw err;

    res.send(data);
  });
  
});

//Get Method with Sort - Data: http://localhost:8080/mongoDB/customersList
app.get("/mongoDB/customersList", function(req , res){

  db.collection("customers").find({}).sort({ name: 1 }).toArray(function(err, data) {
    if (err) throw err;

    res.send(data);
  });
  
});

//Get Method with Sort desc - Data: http://localhost:8080/mongoDB/customerList
app.get("/mongoDB/customerList", function(req , res){

  db.collection("customers").find({}).sort({ name: -1 }).toArray(function(err, data) {
    if (err) throw err;

    res.send(data);
  });
  
});

//Get Method - Data: http://localhost:8080/mongoDB/customerDetails
app.get("/mongoDB/customerDetails", function(req , res){

  db.collection("customers").find({}, { projection:{ _id:0, name:1} }).toArray(function(err, data) {
    if (err) throw err;

    res.send(data);
  });
  
});

//Get Method - Data: http://localhost:8080/mongoDB/customerDetailsByName/ram
app.get("/mongoDB/customerDetailsByName/:name", function(req , res){
  var query = { name: req.params.name };

  db.collection("customers").find(query, { projection:{ _id:0, name:1} }).toArray(function(err, data) {
    if (err) throw err;

    res.send(data);
  });
  
});

//Get Method - Data: http://localhost:8080/mongoDB/customerDetailsByName/ram
app.get("/mongoDB/searchCustomer/:keyword", function(req , res){

  var query = { name: {$regex : req.params.keyword}};

  db.collection("customers").find(query, { projection:{ _id:0, name:1} }).toArray(function(err, data) {
    if (err) throw err;

    res.send(data);
  });
  
});

//Post Method - Data: http://localhost:8080/mongoDB/saveCustomer
app.post("/mongoDB/saveCustomer", function(req , res){

  db.collection("customers").insertOne((req.body), function(err, data) {
    if (err) throw err;

    res.send(data);
  });

});

//Post Method - Data: http://localhost:8080/mongoDB/updateCustomer
app.post("/mongoDB/updateCustomer", function(req , res){

  var myquery = { name: req.body.name };
  var newvalues = { $set: {name: req.body.newName} };

  db.collection("customers").update(myquery, newvalues, function(err, data) {
    if (err) throw err;

    res.send(data);
  });

});

//Post Method - Data: http://localhost:8080/mongoDB/DeleteCustomer
app.post("/mongoDB/DeleteCustomer", function(req , res){

  var myquery = { name: req.body.name };

  db.collection("customers").deleteOne(myquery, function(err, data) {
    if (err) throw err;

    res.send(data);
  });

});

//Post Method - Data: http://localhost:8080/mongoDB/DeleteCustomers
app.post("/mongoDB/DeleteCustomers", function(req , res){

  var myquery = { name: req.body.name };

  db.collection("customers").deleteMany(myquery, function(err, data) {
    if (err) throw err;

    res.send(data);
  });

});
