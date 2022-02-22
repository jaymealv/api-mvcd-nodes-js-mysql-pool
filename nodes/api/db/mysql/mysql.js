const express = require('express');
const mysql = require('mysql');

var pool = mysql.createPool({
    "host": process.env.MYSQL_HOST,
    "port" : process.env.MYSQL_PORT,    
    "database" : process.env.MYSQL_DATABASE,    
    "user" : process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "connectionLimit" : 1000    
});
/*
console.log ('12 Name: ' +process.env.MYSQL_DATABASE);
*/

exports.exec = (query, conn, params=[]) => {
//    console.log("2222 sql: "+query)        
    return new Promise((resolve, reject) => {
        conn.query(query, params, (error, result, fields) => {
            if (error) {
    //console.log("24 sql: "+error.message)                
                reject(error);
            } else {
                resolve(result)
            }
        });
    })
}
exports.pool = pool;