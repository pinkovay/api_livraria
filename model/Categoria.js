//IMPORTACAO DO MODULO DO SEQUELIZE
const sequelize = require("sequelize");

//IMPORTAÇÃO DA CONEXÃO COM O BANCO DE DADOS 
const connection = require("../database/database");


/*
MAPEAMENTO DA TABELA CATEGORIA 

PARAMETROS DO METODO define:
1° -   NOME DA TABELA 
2° - CAMPOS DA TABELA E SUAS REGRAS (DEVE SER  UM JSON)
*/

const Categoria = connection.define(
    'tbl_categoria',
    {
        codigo_categoria:{
            type: sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome_categoria:{
            type: sequelize.STRING(250),
            allowNull: false
        }
    }
);


//SINCRONIZAÇÃO COM O BANCO DE DADOS - CRIA A TABELA CASO ELA NAO EXISTA 
Categoria.sync({force:false});


module.exports = Categoria;