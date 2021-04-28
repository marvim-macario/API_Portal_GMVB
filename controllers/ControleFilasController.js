const {
    propostas,
    fila_precadastro,
    fila_acompanhamento,
    fila_portabilidade,
    fila_regularizacao,
    fila_confirmacao,
    fila_digitacao,
    fila_preanalise
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
    },
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
        const resultFilter = await fila_total3.findAll({
            attributes: [
                [Sequelize.fn('sum', Sequelize.col('qtd_dentro')), 'qtd_dentro'],
                [Sequelize.fn('sum', Sequelize.col('qtd_fora')), 'qtd_fora']
            ]
        })
        return res.json(resultFilter);
    },

    BuscaPreAnalisa: async (req, res) => {
        const registrosLinhas = await fila_preanalise.findAll({
            order: [
                ['qtd', 'DESC']
            ]
        })

        return res.json(registrosLinhas);
    },
    BuscaFaseConfirmacao: async (req, res) => {
        const regitrosLinhas = await fila_confirmacao.findAll({
            order: [
                ['qtd', 'DESC']
            ]
        });

        return res.json(regitrosLinhas);
    },

    BuscaFilaDigitacao: async (req, res) => {
        const linhas = await fila_digitacao.findAll({
            order: [
                ['qtd', 'DESC']
            ]
        })

        return res.json(linhas);
    },

    BuscaFilaSaldo: async (req, res) => {
        const linhas = await fila_saldo.findAll({
            order: [
                ['qtd', 'DESC']
            ]
        })

        return res.json(linhas);
    },

    BuscaFaseAcompanhamento: async (req, res) => {
        const linhas = await fila_acompanhamento.findAll({
            order: [
                ['qtd', 'DESC']
            ]
        })

        return res.json(linhas);
    },
    BuscaAcompanhamento: async (req, res) => {
        const linhaAcompanhamento = await fila_acompanhamento.findAll({
            order:[
                ['qtd', 'DESC']
            ]
        });

        const [resultOfFilter] = await sequelize.query("SELECT count(*) qtd,min(STR_TO_DATE(data_atualizacao,'%d/%m/%Y' '%H:%i:%s')) data_atualizacao,REPLACE(FORMAT(SUM(REPLACE(entregue, '.', '')),2), '.', ',') valor FROM vw_proposta where status in ('AGUARDANDO SALDO','AGUARDANDO RETORNO INSS','EM ANALISE','RISCO - CONTRATOS PENDENTES AVERBA�AO','APROVADO NO NS/AGUARDANDO RH DA EMPRESA','RECUPERACAO DE PENDENCIA','APROVADO NO NS/ AGUARDANDO RETORNO CSG','SALDO NAO RECEBIDO, AGUARDANDO 2 DIAS','EM ANALISE -  SALDO','AGUARDANDO ATUALIZACAO CADASTRAL','LIBERACAO DE CONSISTENCIA 180','LIBERACAO DE CONSISTENCIA 162','ANALISE DE CONSISTENCIA 162','EM ANALISE / BANCO ITAU','APROVADO NS CARTAO OLE','PORTABILIDADE EM VERIFICACAO','PRE SOLICITACAO DE SALDO','PROPOSTA NAO FINALIZADA INSS ','AGUARDANDO SALDO - SMS','PRE SOLICITACAO DE SALDO - SMS','SALDO INFORMADO - SMS','EM ANALISE SALDO - SMS','DECURSO DE PRAZO') ORDER BY qtd desc")
        const searchAcompanhamento = await fila_precadastro.findAll({
            attributes: [
                [Sequelize.fn('sum', Sequelize.col('qtd_dentro')), 'qtd_dentro'],
                [Sequelize.fn('sum', Sequelize.col('qtd_fora')), 'qtd_fora'],
            ]
        });

        return res.json({
            registrosLinhas: linhaAcompanhamento,
            valorQuantidadeFinal: resultOfFilter,
            quantidades: searchAcompanhamento
        });
    },

    BuscaPortabilidade: async (req, res) => {
        const linhaPortabilidade = await fila_portabilidade.findAll({
            order:[
                ['qtd', 'DESC']
            ]
        });

        const [resultOfFilter] = await sequelize.query("SELECT count(*) qtd,min(STR_TO_DATE(data_atualizacao,'%d/%m/%Y' '%H:%i:%s')) data_atualizacao,REPLACE(FORMAT(SUM(REPLACE(entregue, '.', '')),2), '.', ',') valor FROM vw_proposta where status in ('AGUARDANDO N DE PORTABILIDADE','PORTABILIDADE MESA') ORDER BY qtd desc")
        const searchPortabilidade = await fila_portabilidade.findAll({
            attributes: [
                [Sequelize.fn('sum', Sequelize.col('qtd_dentro')), 'qtd_dentro'],
                [Sequelize.fn('sum', Sequelize.col('qtd_fora')), 'qtd_fora'],
            ]
        });

        return res.json({
            registrosLinhas: linhaPortabilidade,
            valorQuantidadeFinal: resultOfFilter,
            quantidades: searchPortabilidade
        });
    },

    BuscaRegularizacao: async (req, res) => {
        const linhaRegularizacao = await fila_regularizacao.findAll({
            order:[
                ['qtd', 'DESC']
            ]
        });

        const [resultOfFilter] = await sequelize.query("SELECT count(*) qtd,min(STR_TO_DATE(data_atualizacao,'%d/%m/%Y' '%H:%i:%s')) data_atualizacao,REPLACE(FORMAT(SUM(REPLACE(entregue, '.', '')),2), '.', ',') valor FROM vw_proposta where status in ('DOCUMENTO IRREGULAR','AGUARDANDO LIBERACAO DE OUTRAS PROPOSTAS DO MESMO CLIENTE',' INCOMPLETA/INCORRETA','INFORMAR CONTATO DO CLIENTE','PENDENTE','SEM CONTATO COM O CLIENTE - ANEXAR GRAVACAO','CCB INCOMPLETA/INCORRETA','ASSINAR ADE EM ANEXO','PENDENTE CODIGO UNICO','AGUARDANDO LIBERA��O DE TAXA ESPECIAL','PROPOSTA EM RASCUNHO','CLIENTE ALEGA QUE N�O ASSINOU O CONTRATO','INFORMAR TELEFONE PROCEDENTE','SALDO MAIOR COLETAR ASSINATURA','SALDO MENOR PARCELA MAIOR COLETAR ASSINATURA','ORIENTAR CLIENTE - CONFIRMACAO NAO REALIZADA','AGUARDANDO RETORNO SMS EM ATE 24H','SALDO A MAIOR SMS AUTORIZAR','SALDO COLETAR ASSINATURA - BRADESCO','INFORMAR TABELA DE SALDO - BRADESCO') ORDER BY qtd desc")
        const searchRegularizacao = await fila_regularizacao.findAll({
            attributes: [
                [Sequelize.fn('sum', Sequelize.col('qtd_dentro')), 'qtd_dentro'],
                [Sequelize.fn('sum', Sequelize.col('qtd_fora')), 'qtd_fora'],
            ]
        });

        return res.json({
            registrosLinhas: linhaRegularizacao,
            valorQuantidadeFinal: resultOfFilter,
            quantidades: searchRegularizacao
        });
    },

    
}

module.exports = ControleFilasController; 