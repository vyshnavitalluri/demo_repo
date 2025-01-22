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
 
 
 
 
app.get('/getUsersListById',(req,res)=>{
    try{
        console.log(req.query);
        let id = req.query.id
        let sql = 'select * from demo1 where id = ?';
        connection.query(sql,[id],(err,result)=>{
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
 
 
app.post('/create',(req,res)=>{
    let payload = req.body;
    console.log("payload",payload);
    let postSql = 'insert into war(name,mobile,age) values(?,?,?)';
    connection.query(postSql,[payload.name , payload.mobile , payload.age],(err,results)=>{
        if(err){
            return res.json({
                status:false,
                message:"Users details nOT  Created successfully",
                data:err
            })
            
        }else{
            return res.json({
                status:true,
                message:"Users details  Created successfully",
                data:results
            })
 
        }
 
    })
 
})
 
 
app.delete('/deleteById',(req,res)=>{
    let id = req.query.id;
    console.log(id)
    let deleteSql = "delete from demo1 where id =?";
    connection.query(deleteSql,[id],(err,results)=>{
        if(err){
            return res.json({
                status:false,
                message:"Users details nOT  Deleted successfully",
                data:err
            })
            
        }else{
            return res.json({
                status:true,
                message:"Users details  deleted successfully",
                data:results
            })
 
        }
 
    })
})
 
 
app.get('/getproductById/:id',(req,res)=>{
    console.log(req.params); // using params 
})
 
 
 
app.listen(PORT,function(err){
    console.log(`server is running on ${PORT}`)
})