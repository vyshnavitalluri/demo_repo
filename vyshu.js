let express = require('express')
let bodyParser = require('body-parser')
let mysql = require('mysql2'); // mysql
const cors = require('cors');
 
let jwt = require('jsonwebtoken');
 
let addFun = require('./add');
 
require('dotenv').config()
let app = express();
app.use(bodyParser.json())
 
app.options("*", cors());
 
 
const allowedOrigins = ['http://example.com', 'http://anotherdomain.com', 'http://127.0.0.1:5173'];
 
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true); // Allow request
    } else {
      callback(new Error('Not allowed by CORS')); // Deny request
    }
  },
  methods: ['GET', 'PUT', 'POST', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed custom headers
  credentials: true, // Allow cookies or credentials
};
 
app.use(cors());
let PORT = process.env.PORT
 
let connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
})
connection.connect(function(error){
    if(error){
        console.log("Db Is not connected",error)
 
    }else{
        console.log("DB Is Connected Successfully")
    }
})
 
 
app.get('/',(req,res)=>{
    console.log("Hey Helooooo Middle Wares");
    // next();
})
 
app.use('/getProductList', (req,res)=>{
    return res.send("SERVER IS RUNNING GOOD00000000")
})
 
app.post('/newProducts',(req,res)=>{
    console.log(req.body,"body");  
 
})
 
 
 

app.get('/getUsersListById',async(req,res)=>{
    try{
        console.log("welcome")
        console.log(req.query,"hello");
        let id = req.query.id
        console.log(id,"id")
        console.log("hello")
        let sql = 'select * from war where id = ?';
        console.log("welcome")
        console.log(sql)
        connection.query(sql,[parseInt(id)],(err,result)=>{
            console.log(result)
            if(err){
                return res.json({
                    status:false,
                    message:"Users details nOT  Feteched successfully",
                    data:err
                })
                
            }else{
                return res.json({
                    status:true,
                    message:"Users details  Feteched successfully",
                    data:result
                })
 
            }
            
        })
 
    }catch(error){
        return res.json({
            status:false,
            message:"Users details nOT  Feteched successfully",
            data:error
        })
 
    }
   
 
})
 
 
 
app.get('/getproductById/:id',(req,res)=>{
    console.log(req.params); // using params 
})
 
 
 
app.listen(PORT,function(err){
    console.log(`server is running on ${PORT}`)
})
 
 