//create Server Using Express Frame Work and Create CURD Opeartions
 
let express = require('express');
let bodyParser = require('body-parser');
 
 
require('dotenv').config();
 
 
let app = express();
app.use(bodyParser.json());
 
let PORT = process.env.PORT
 
app.get('/getProductList', (req,res)=>{
    return res.send("SERVER IS RUNNING GOOD00000000")
})
 
app.post('/newProducts',(req,res)=>{
    console.log(req.body,"body"); 
})
 
app.get('/getproductById',(req,res)=>{
    console.log(req.query); // using query
})
 
app.get('/getproductById/:id',(req,res)=>{
    console.log(req.params); // using params 
})
 
app.listen(PORT,function(err){
    console.log(`server is running on ${PORT}`)
})
 