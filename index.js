//npm install express
var express = require('express');
var app = express();

// Default Route
app.get('/', function (req, res) {
   res.send('<h1>Hello World</h1>');
})

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//Configure CORS ------------------
//npm install cors
var cors = require('cors');
const corsOptions ={
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    Headers: "Origin, X-Requested, Content-Type, Accept Authorization",  
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

// Connect MySQL Database ----------------
// npm install mysql 
var mysql = require('mysql');

// Create Connection to MySQL
var connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'mysql',
  database:'store'
});

//GET Student Data: http://localhost:8080/products
app.get("/products", function(req , res){
connection.query("SELECT * FROM store.products", function (err, data) {
      if (err) return next(new AppError(err, 500));
          res.status(200).json({
          status: "success",
          length: data?.length,
          data: data,
      });
  });
});
    