//IMPORTACAO DO MODULO DO SEQUELIZE
const sequelize = require("sequelize");

//CRIA A CONEXAO COM O BANCO DE DADOS POR MEIO DO SEQUELIZE 
/*
PARAMETROS:
1° - Nome do banco de dados 
2° - Usuário do banco de dados
3° - A senha do banco de dados
4° - Objeto JSON com dados de configurações
        1 - host do banco de dados
        2 = a porta logica do banco de dados 
        2 - dialete sql a ser utilizado 
        3 - timezone
*/

const connection = new sequelize(
    "bd_api_livraria",
    "root",
    "",
    {
        host: "localhost",
        port: "3306",
        dialect: "mysql",
        timezone: "-03:00",
        logging: false
    }
);

if (!connection.config.logging){
    console.warn(`\x1b[43m%s\x1b[0m`, ' Aviso: O logging está desativado na configuração de conexão do projeto \n')
    // console.warn("Aviso: O logging está desativado na configuração de conexão do projeto.")
}

module.exports = connection;





