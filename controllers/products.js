let express = require('express');
let app = express();
let connection = require('../db.js');
 
 
 
const createProducts = (payload) =>{
    return new Promise((resolve,reject)=>{
        let sql = 'insert into products(product_id,product_name,product_price)  values(?,?,?)';
        connection.query(sql,[payload.product_id,payload.product_name,payload.product_price],(err,results)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(results);
            }
        })
 
    })
 
}
 
 
app.post('/create',async (req,res)=>{
    try{
        let payload = req.body;
        let response =  await createProducts(payload);  
 
 
        return res.json({
            status:true,
            message:"Products Addedd Successfully",
            response:response
 
        })  
 
    }catch(error){
        return res.json({
            status:false,
            message:"products Not created successfully",
            error:error
        })
 
    }
 
    
})
 
 
const getProductList = ()=>{    
    return new Promise((resolve,reject)=>{
        let sql = "select * from products";
        connection.query(sql,[],(err,resulst)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(resulst);
            }
            
        })
 
    })
}
    
app.get('/getProducts',async (req,res)=>{
    let data = await getProductList();
    return res.json({
        status:true,
        message:"Products Getting Successfully",
        response:data
    }) 
})
 
 
 
 
const deleteProductById = (id)=>{
    return new Promise((resolve,reject)=>{
        let sql = "delete from products where product_id=?"
        connection.query(sql,[id],(err,resulst)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(resulst);
            }
            
        })
 
    })
}
 
 
app.delete('/deleteProducts',async (req,res)=>{
    let id = req.params.product_id
    let data = await deleteProductById(id);
    return res.json({
        status:true,
        message:"Products deleted Successfully",
        response:data
    }) 
})
 
app.get('/getProducts/:id',(req,res)=>{
    console.log("get Product list ")
})
 
 
module.exports = app