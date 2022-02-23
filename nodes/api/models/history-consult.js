const express = require('express');
const exec = require('../db/mysql/mysql');
const mysql = require('../db/mysql/mysql').pool;


exports.getName = (name) => {
//exports.getName = function (name) {

    try {
        return new Promise((resolve, reject) => {
            mysql.getConnection((error, conn) => {
                if (error) { return error.message };                
        
                var sql = "SELECT * FROM <tabela> WHERE <campo> LIKE '%"+name+"%';";
                exec.exec( sql, conn,(err, rows ) => {
                if (err) {
                    reject(err);
                }
                    resolve(rows);            
            //console.log('line 22 ' + JSON.stringify(rows));
                });
            });
        });
    } catch (error) {
        return { error: error.message };
    }
}
