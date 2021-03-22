const {
    cancelamento
} = require('../models/');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const CancelamentoContreller = {

    IncluirCancelamento: async (req, res) => {
        const {
            motivo_cancelamento1,
            proposta,
            parceiro,
            supervisor,
            gerente,
            status,
            data_inclusao,
            data_cancelamento,
            responsavel,
            obs,
            empresa,
            data_atualizacao,
            cpf,
            cpf_parceiro,
            cpf_supervisor,
            cpf_gerente,
            id_acesso
        } = req.body;

        const IncluirCancelamento = await cancelamento.create({
            motivo_cancelamento1: motivo_cancelamento1,
            proposta: proposta,
            parceiro: parceiro,
            supervisor: supervisor,
            gerente: gerente,
            status: 'SOLICITACAO DE CANCELAMENTO',
            data_inclusao: data_inclusao,
            data_cancelamento: data_cancelamento,
            responsavel: responsavel,
            obs: obs,
            empresa: empresa,
            data_atualizacao:data_atualizacao,
            cpf: cpf,
            cpf_parceiro: cpf_parceiro,
            cpf_supervisor: cpf_supervisor,
            cpf_gerente: cpf_gerente,
            id_acesso: id_acesso
        });
        return res.status(200).send(IncluirCancelamento);
    },

    Filtro: async (req, res) => {
        const {
            userTipousuario,
            userPerfil,
            userCpf,
            usuario,

            motivo_cancelamento1,
            proposta,
            status,
            empresa,
            data_inclusao,
            data_cancelamento
        } = req.body

        let where = {};
        if (usuario) where.usuario = {
            [Op.substring]: usuario
        };
        if (motivo_cancelamento1) where.motivo_cancelamento1 = motivo_cancelamento1;
        if (proposta) where.proposta = proposta;
        if (status) where.status = status;
        if (empresa) where.empresa = empresa;
        if (data_inclusao) where.data_inclusao = data_inclusao;
        if (data_cancelamento) where.data_cancelamento = data_cancelamento;

        if (userTipousuario === 'PARCEIRO' && userPerfil === 'MATRIZ' || userTipousuario === 'PARCEIRO' && userPerfil === 'SUB ACESSO') where.cnpj = userCpf;
        // if(userTipousuario ==='SUPERVISOR') where.supervisor = userNome;
        // if(userTipousuario ==='GERENTE') where.gerente = userNome;
        // console.log(where);

        try {
            const pesquisa = await cancelamento.findAll({
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
                id_cancelamento
            } = req.body;

            const dadosCancelamento = await cancelamento.findOne({
                where: {
                    id_cancelamento
                }
            })
            return res.status(200).send(dadosCancelamento)

        } catch (error) {
            console.log(error)
            res.send(error);
        }
    },

    Alterar: async (req, res) => {
        const {
            id_cancelamento,
            data_inclusao,
            proposta,
            status,
            motivo_cancelamento1,
            parceiro,
            supervisor,
            gerente,
            responsavel,
            data_atualizacao
        } = req.body

        try {

            const BuscaCancelamento = await cancelamento.findOne({
                where: {
                    id_cancelamento
                }
            })

            if (!BuscaCancelamento) {
                return res.send("Cancelamento inexistente")
            }

            BuscaCancelamento.data_inclusao = data_inclusao
            BuscaCancelamento.proposta = proposta
            BuscaCancelamento.status = status
            BuscaCancelamento.motivo_cancelamento1 = motivo_cancelamento1
            BuscaCancelamento.parceiro = parceiro
            BuscaCancelamento.supervisor = supervisor
            BuscaCancelamento.gerente = gerente
            BuscaCancelamento.responsavel = responsavel
            BuscaCancelamento.data_atualizacao = data_atualizacao
            BuscaCancelamento.save()
            return res.status(200).json(BuscaCancelamento)

        } catch (error) {
            console.log(error)
        }
    }


}

module.exports = CancelamentoContreller;