const {
    fluxo_digital
} = require('../models/');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const AprovacaoPropostaController = {

    IncluirAprovacao: async (req, res) => {
        const {
            banco,
            proposta,
            cpf,
            tipo,
            status,
            data_inclusao,
            parceiro,
            supervisor,
            gerente,
            data_alteracao,
            responsavel
        } = req.body;

        const IncluirAprovacao = await fluxo_digital.create({
            banco: banco,
            proposta: proposta,
            cpf: cpf,
            tipo: tipo,
            status: 'SOLICITACAO DE APROVAÇÃO',
            data_inclusao: data_inclusao,
            parceiro: parceiro,
            supervisor: supervisor,
            gerente: gerente,
            data_alteracao: data_alteracao,
            responsavel: responsavel
        });
        return res.status(200).send(IncluirAprovacao);
    },

    Filtro: async (req, res) => {
        const {
            userTipousuario,
            userPerfil,
            userCpf,
            userNome,
            usuario,

            banco,
            proposta,
            status
        } = req.body;

        let where = {};
        if (usuario) where.usuario = {
            [Op.substring]: usuario
        };
        if (banco) where.banco = banco;
        if (proposta) where.proposta = proposta;
        if (status) where.status = status;
        if (userTipousuario === 'PARCEIRO' && userPerfil === 'MATRIZ' || userTipousuario === 'PARCEIRO' && userPerfil === 'SUB ACESSO') where.cnpj = userCpf;
        if (userTipousuario === 'SUPERVISOR') where.supervisor = userNome;
        if (userTipousuario === 'GERENTE') where.gerente = userNome;

        try {
            const pesquisa = await fluxo_digital.findAll({
                where
            })
            if (pesquisa)
                return res.status(200).json(pesquisa)
        } catch (error) {
            console.log(error)
        }
    },

    Modal: async (req, res) => {
        try {

            const {
                id_fluxo
            } = req.body;

            const dadosAprovacao = await fluxo_digital.findOne({
                where: {
                    id_fluxo
                }
            })
            return res.status(200).send(dadosAprovacao)

        } catch (error) {
            console.log(error)
            res.send(error);
        }
    },

    Alterar: async (req, res) => {
        const{
            id_fluxo,
            proposta,
            status,
            banco,
            tipo,
            cpf
        }= req.body

        try{
            const BuscaAprovacao = await fluxo_digital.findOne({
                where: {
                    id_fluxo
                }
            })

            if (!BuscaAprovacao) {
                return res.send("Aprovacao proposta inexistente")
            }

            BuscaAprovacao.proposta = proposta
            BuscaAprovacao.status = status
            BuscaAprovacao.banco = banco
            BuscaAprovacao.tipo = tipo
            BuscaAprovacao.cpf = cpf
            BuscaAprovacao.save()
            return res.status(200).json(BuscaAprovacao)
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = AprovacaoPropostaController;