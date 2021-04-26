const db = require('../config/database1');

const MortorController = {
    create: async(req, res)=>{
        
        var { element:{
            proposta,cpf,nome,data_cadastro,data_base,
            valor_solicitado,valor_refin,valor_liberado,prazo_contrato,
            mês,portabilidade,contrato,convenio,atividade,produto,tipo,
            regra,nome_promotor,cpf_promotor,siglae_corrigida,siglae,
            empresa,correntista,taxa,pontos_campanha,banco,taxa2
        } } = req.body;

        var sql = `SELECT * FROM USUARIO WHERE SENHA = '${senha}' AND LOGIN = '${user}'`;
        db.query(sql, function (error, results, fields) {
            if (error){ console.log(error.code);
            console.log(error)
             } else {
                 console.log(results)
             }

      
    })

}}

module.exports = MortorController