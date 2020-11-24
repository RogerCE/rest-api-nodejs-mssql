const sql = require('mssql');

//Configurate db
const config = {
    user: 'name',
    password: 'password',
    server: 'name',
    database: 'name',
    options:{
        trustedconnection: true,
        enableArithAbort: true,
        instancename: 'localhost' //nombre de instancia desde sqlserver localhost://QLEXPRESSS
    },
    port: 1234,
}

//if you have error with database
const connection = sql.connect(config, (err,res)=>{
    if (err) {
        //throw err;
        console.log("Error to connect db!!");

    }else{
        console.log("db is connected!!");
    }
});

module.exports = config;
