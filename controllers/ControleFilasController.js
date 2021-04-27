const {
    propostas,
    fila_precadastro
} = require("../models");
const config = require("../config/database");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(config);

const ControleFilasController = {
    BuscaPreCadastros: async (req, res) => {
        const linhasPreCadastro = await fila_precadastro.findAll({
            order:[
                ['qtd', 'DESC']
            ]
        });


        const [resultOfFilter] = await sequelize.query("SELECT count(*) qtd,min(STR_TO_DATE(data_atualizacao,'%d/%m/%Y' '%H:%i:%s')) data_atualizacao,min(STR_TO_DATE(data_envio,'%d/%m/%Y' '%H:%i:%s')) data_envio, REPLACE(FORMAT(SUM(REPLACE(entregue, '.', '')),2), '.', ',') valor FROM propostas where status in ('IDENTIFICACAO PROPOSTA - AGUARDANDO DOCUMENTACAO','CADASTRADO BANCO - AGUARDANDO DOCUMENTACAO','CADASTRO - AGUARDANDO CONTRATO','AGUARDANDO ANALISE DE TAXA ESPECIAL')  ORDER BY qtd desc");

        const searchPreCadastro = await fila_precadastro.findAll({
            attributes: [
                [Sequelize.fn('sum', Sequelize.col('qtd_dentro')), 'qtd_dentro'],
                [Sequelize.fn('sum', Sequelize.col('qtd_fora')), 'qtd_fora'],
            ]
        });

        return res.json({
            registrosLinhas: linhasPreCadastro,
            valorQuantidadeFinal: resultOfFilter,
            quantidades: searchPreCadastro
        });
    },
    BuscaDadosPropostas: async (req, res) => {
        const data_cadastro = `0${new Date().getDate()}/0${new Date().getMonth()+1}/${new Date().getFullYear()}`;
        // console.log(data_cadastro);

        const [resultFilter] = await sequelize.query(`SELECT count(*) qtd,REPLACE(FORMAT(SUM(REPLACE(entregue, '.', '')),2), '.', ',') valor FROM vw_proposta where status not in ('CADASTRO - AGUARDANDO DOCUMENTACAO','CADASTRO - AGUARDANDO CSG','CADASTRADO CSG - AGUARDANDO DOCUMENTACAO','REPROVADO - DADOS CADASTRAIS','REPROVADO - CSG','PENDENTE CSG','IDENTIFICACAO PROPOSTA - AGUARDANDO DOCUMENTACAO','CADASTRO - AGUARDANDO CONTRATO') and data_envio like '%"${data_cadastro}"%'`);

        return res.json(resultFilter);
    },
    BuscaIntegradasDia: async (req, res) => {
        const dataEspecifica = `${new Date().getFullYear()}-0${new Date().getMonth()+1}-0${new Date().getDate()}`;

        const [resultFilter] = await sequelize.query(`SELECT count(*) qtd,REPLACE(FORMAT(SUM(REPLACE(entregue, '.', '')),2), '.', ',') valor FROM status_proposta,propostas where propostas.codigo = status_proposta.codigo and status_proposta.status = 'INTEGRADO' and status_proposta.data_log like '%"${dataEspecifica}"%'`);

        return res.json(resultFilter);
    },
    BuscaIntegradasMes: async (req, res) => {
        const mesEspecifico = `${new Date().getMonth()+1}/${new Date().getFullYear()}`;

        const [resultFilter] = await sequelize.query(`SELECT count(*) qtd,case when REPLACE(FORMAT(SUM(REPLACE(entregue, '.', '')),2), '.', ',') is null then '0,00' else REPLACE(FORMAT(SUM(REPLACE(entregue, '.', '')),2), '.', ',') end as valor FROM vw_proposta where vw_proposta.status = 'INTEGRADO' and vw_proposta.data_log1 like '%"${mesEspecifico}"%'`);

        return res.json(resultFilter);
    },
    FarolTotal: async (req, res) => {
        const resultFilter = await sequelize.query(`SELECT sum(qtd_dentro) qtd_dentro,sum(qtd_fora) qtd_fora FROM fila_total3`);

        return res.json(resultFilter);
    }

}

module.exports = ControleFilasController;