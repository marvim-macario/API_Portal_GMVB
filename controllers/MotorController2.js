const Sequelize = require('sequelize');
const config = require('../config/database')
const db = new Sequelize(config);

const MotorController2 = {
    
    index: async (req, res) => {

        var { element: { proposta,cpf,nome,data_cadastro,data_base,valor_solicitado,valor_refin,valor_liberado,prazo_contrato,mês,portabilidade,contrato,convenio,atividade,produto,tipo,regra,nome_promotor,cpf_promotor,siglae_corrigida,siglae,empresa,correntista,taxa,pontos_campanha,banco,taxa2 }} = req.body;
        

    }

}

module.exports = MotorController2