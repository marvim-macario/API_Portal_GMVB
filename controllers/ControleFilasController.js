const { propostas, fila_precadastro} = require("../models");
const config = require("../config/database")

const Sequelize = require("sequelize");

const sequelize = new Sequelize(config);

const ControleFilasController = {
    BuscaPreCadastros: async (req, res) => {
        const [resultOfFilter] = await sequelize.query("SELECT count(*) qtd,min(STR_TO_DATE(data_atualizacao,'%d/%m/%Y' '%H:%i:%s')) data_atualizacao,min(STR_TO_DATE(data_envio,'%d/%m/%Y' '%H:%i:%s')) data_envio, REPLACE(FORMAT(SUM(REPLACE(entregue, '.', '')),2), '.', ',') valor FROM propostas where status in ('IDENTIFICACAO PROPOSTA - AGUARDANDO DOCUMENTACAO','CADASTRADO BANCO - AGUARDANDO DOCUMENTACAO','CADASTRO - AGUARDANDO CONTRATO','AGUARDANDO ANALISE DE TAXA ESPECIAL')  ORDER BY qtd desc");
        
        return res.json(resultOfFilter);
    }
}

module.exports = ControleFilasController;
