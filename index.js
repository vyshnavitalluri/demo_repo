let express = require('express');
let app = express();
require('dotenv').config();
let PORT = process.env.PORT

app.get('/getProductList', (req,res)=>{
    return res.send("SERVER IS RUNNING GOOD00000000")
})



// single quotes and backtickets  and double qoutes 

app.listen(PORT,function(err){
    console.log(`server is running on ${PORT}`)
})



