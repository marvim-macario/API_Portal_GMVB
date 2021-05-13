const Sequelize = require('sequelize');
const config = require('../config/database')
const db = new Sequelize(config);

 const BuscaProposta = async(proposta,tabela)=>{
     await db.query(`SELECT proposta FROM ${tabela} where proposta = '${proposta}'`, function (err, result) {
        if (err) return err;
        console.log("Result: " + result);
      });
  
}

module.exports = BuscaProposta;
