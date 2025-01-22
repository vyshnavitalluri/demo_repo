let mysql = require('mysql2')
let connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
})
module.exports=connection