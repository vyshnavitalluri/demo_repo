let express = require('express')
let bodyParser = require('body-parser')
let mysql = require('mysql2'); // mysql
const cors = require('cors');
 
let jwt = require('jsonwebtoken');
 
let add = require('./add');
 
require('dotenv').config()
let app = express();
app.use(bodyParser.json())
 
//app.options("*", cors());
 
 
const allowedOrigins = ['http://example.com', 'http://anotherdomain.com', 'http://127.0.0.1:5173'];
 
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true); // Allow request
    } else {
      callback(new Error('Not allowed by CORS')); // Deny request
    }
  },
  methods: ['GET', 'PUT', 'POST','DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed custom headers
  credentials: true, // Allow cookies or credentials
};
 
app.use(cors(corsOptions));
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
 
 
 
// jwt.sign({
//     data: 'foobar'
//   }, 'secret', { expiresIn: '1h' });
 
let data = {
    "name":"vyshnavi",
    "email":"tallurivyshnavi@gmail.com",
    "id":898989,
    "mobile":"2013752735"
}
 
let token = jwt.sign(data, process.env.TOKENSECRET ,  { expiresIn: '1h' })
 
console.log(token);//encode formate 
 
var decoded = jwt.verify(token, process.env.TOKENSECRET);
 
console.log("decoded",decoded);
 
 
console.log(module.exports,"vyshnavi")
 
 

console.log("function calling",add())

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
 
 
 
function demo(req,res,next){
 
    console.log("Welcome vyshnavi HIIII Helooo")
 
    //if any errror stop 
 
    next();
 
}
 
 
 
 
 
app.get('/getproductById',demo,(req,res)=>{
 
    console.log(req.query); // using query
})
 
 
 
app.get('/getproductById/:id',(req,res)=>{
    console.log(req.params); // using params 
})
 
 
 
app.listen(PORT,function(err){
    console.log(`server is running on ${PORT}`)
})
