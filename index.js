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

var mysql = require('mysql')

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'mysql',
    database:'grocery_store'
  });
  
app.get("/products", function(req , res){
    connection.query("SELECT * FROM grocery_store.products", function (err, data) {
        if (err) return next(new AppError(err, 500));
            res.status(200).json({
            status: "success",
            length: data?.length,
            data: data,
        });
    });
});

