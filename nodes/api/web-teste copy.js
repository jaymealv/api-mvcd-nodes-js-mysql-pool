const express = require("express");
const mysql = require("mysql");

const app =  express();

const conn = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'jjagf',
    database: 'jgreenco_score'
});

 conn.connect(function(err) {

    if (!err) { throw err;

    
    conn.query("SELECT col_IDcolegio as id, col_colegio as colegio FROM score_colegio", function(err, result, fields) {

        if (!err) { 
          console.log(result); 
/*          console.log('ERROR: banco conectado: ' + result);           */
          } 
        }) 
      } else {
        console.log('ERROR: banco não conectado: '); 

      }
      conn.end();      
});
