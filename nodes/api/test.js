
var mysql = require('mysql');

var con = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'jjagf',
    database: 'jgreenco_score'
});

con.connect(function(err) {

    console.log('conectou ao banco web: ');

  if (err) throw err;

//  con.query("SELECT * FROM teste", function (err, result, fields) {
    con.query("SELECT col_IDcolegio as ID, col_colegio as colegio FROM score_colegio", function(err, result, fields) {    
    
  
    console.log(err);
/*    console.log(result);
    console.log(fields);
*/    
    for (var i in result) {
      console.log('Values: ', result[i]);
    }

  });
});