const mysql2 = require('mysql2');

 const db = mysql2.createConnection({
    host: "localhost",
    user:"root",
    password:"Amar@123",
    database:"blog"
})

module.exports= db;