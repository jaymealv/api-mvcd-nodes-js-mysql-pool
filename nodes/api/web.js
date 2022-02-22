console.log('passei aqui')

const { conn, Ler }  = require ("./dbmysql/mysql");

//const conn = new Conn();


const sql = "SELECT col_IDcolegio as id, col_colegio as colegio FROM score_colegio";

const colegio = Ler.consulta(conn, sql);
console.log(colegio);

 

