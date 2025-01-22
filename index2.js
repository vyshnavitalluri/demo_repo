let express = require('express')
let bodyParser = require('body-parser')
let mysql = require('mysql2'); // mysql
const cors = require('cors');
require('dotenv').config()
let app = express();
app.use(bodyParser.json())
app.options("*", cors());
let connection = require('./db.js')
 
let product = require('./products.js');
 
app.use(cors());
let PORT = process.env.PORT
 
 
connection.connect(function(error){
    if(error){
        console.log("Db Is not connected",error)
 
    }else{
        console.log("DB Is Connected Successfully")
    }
})
 
 
app.get('/getP',(req,res)=>{
    console.log("Hey Helooooo Middle Wares");
    // next();
})
 
 
app.use('/testing',(req,res)=>{
    return res.json({"message":"sucesss"})
})
 
 
app.use('/api/v1',product); //http://localhost:8080/api/v1/create   ---- new products Api method POST
//http://localhost:8080/api/v1/getProducts ===== get Product List GET API
 
 
app.listen(PORT,function(err){
    console.log(`server is running on ${PORT}`)
})
 
 