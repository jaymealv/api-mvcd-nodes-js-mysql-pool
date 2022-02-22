# api-mvcd-nodes-js-mysql-pool

Estudo de caso: Promise do Nodejs

Conclusão : poderia ser mais intuitiva/simples, talvez na proxima versão n.x.x.

Do meu ponto de vista um Bug, Será?

criando um MVC para teste de API, me deparei com seguinte problema
Criei uma Estrutura metodos(MVCD), "D  minha invenção. rsrs",  para obter um resultSet do BD.
index.js
  --routes
	--- controllers
        --- models
	--- db
	    ..... conection
	    ..... query
 

A promise do nodejs, javascript, teoricamente diz que algum procedimento que você executou assíncrono, deve ter seu resultado resolvido ou rejeitado. Aplicando esse conceito em cima de outro conceito que é "exports de função" do node js, conectando ao banco de dados modelo Pool do próprio nodejs, descobri que a premise funcionando da seguinte forma, vamos para exemplo de código que acredito fique mais facil de entender.

Espero que tenha sido didático, dentro do possível. Fiquem à vontade para discordar.

ASSIM NAO FUNCIONA:
Entendo que não funciona, porque a conexão 'POOL" função ( mysql.getConnection, "conn") criada pelo método getConnection, O "state" não é reconhecida pela promise quando seu objeto é criado , o BUG, na minha interpretação esta que , a mesma, deveria reconhecer automaticamente a conexão ,"conn",  criada ,  já que procedimento foi executado com sucesso e está dentro de modules exports, "container", com state ativo. 
Também vale ressaltar que a promise foi criada para "resolve" retorno assíncrono do 'result' da função "exec" e não da conexão junto.

const express = require('express');

const exec = require('../db/mysql');

const mysql = require('../db/mysql').pool;

exports.getName = (name) => {

    try {
    
        mysql.getConnection((error, conn) => {
	
            if (error) { return error.message };
	    
	        var sql = "SELECT his_ID, his_cpf, his_nome FROM score_historico WHERE his_nome LIKE '%"+name+"%';";
		
		return new Promise((resolve, reject) => {
		
		
			exec.exec( sql, conn,(err, rows ) => {
			
			
			if (err) {
			
				reject(err);
				
				}
				
				resolve(rows);
				
			});
			
		});
		
	});
	
    } catch (error) {
    
      return { error: error.message };
      
      
    }
    
    
}


ASSIM FUNCIONA: pois a promise consegue manter "state" da função mysql.getConnection, "conn".

const express = require('express');

const exec = require('../db/mysql');

const mysql = require('../db/mysql').pool;

exports.getName = (name) => {

	try {
	
		return new Promise((resolve, reject) => {
		
			mysql.getConnection((error, conn) => {
			
				if (error) { return error.message };
				
				var sql = "SELECT his_ID, his_cpf, his_nome FROM score_historico WHERE his_nome LIKE '%"+name+"%';";
				
				exec.exec( sql, conn,(err, rows ) => {
				
					if (err) {
					
						reject(err);
						
					}
					
						resolve(rows);
						
				});
				
			});
			
		});
		
	} catch (error) {
	
		return { error: error.message };
	}
}
