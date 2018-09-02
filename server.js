var express = require('express');
var app = express();

app.get('/', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
    user: 'sa',
    password: 'sasa@123',
    server: 'localhost\\MSSQLSERVERDEV', // You can use 'localhost\\instance' to connect to named instance
    database: 'Data2017_QC',
 
    options: {
        trustedConnection: true,
        encrypt: false // Use this if you're on Windows Azure
    },
    port:57350,
    };
    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) {
            sql.close();
            console.log(err);
        }

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from ApplicationUsers', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});