const{
    margem_governo
} = require('../models/');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const MargemGovernoController = {

    IncluirMargemGoverno: async (req, res) => {
        const {
            data_inclusao,
            cpf,
            agencia,
            conta,
            convenio,
            margem,
            status,
            data_atualizacao,
            parceiro,
            data_venda,
            supervisor,
            gerente,
            id_acesso,
            cpf_parceiro,
            cpf_supervisor,
            cpf_gerente,
            responsavel
        } = req.body;

        const IncluirMargemGoverno = await margem_governo.create({
            data_inclusao,
            cpf: cpf,
            agencia: agencia,
            conta: conta,
            convenio: convenio,
            margem: margem,
            status: 'MARGEM SOLICITADA',
            data_atualizacao: data_atualizacao,
            parceiro: parceiro,
            data_venda: data_venda,
            supervisor: supervisor,
            gerente: gerente,
            id_acesso: id_acesso,
            cpf_parceiro: cpf_parceiro,
            cpf_supervisor: cpf_supervisor,
            cpf_gerente: cpf_gerente,
            responsavel: responsavel
        });
        return res.status(200).send(IncluirMargemGoverno);
    },

    Filtro: async (req, res) =>{
        const {
            userTipousuario,
            userPerfil,
            userCpf,
            userNome,
            usuario,

            status,
            convenio,
            cpf,
            data_atualizacao
        } = req.body;

        let where = {};
        if (usuario) where.usuario = {
            [Op.substring]: usuario
        };
        
        if (status) where.status = status;
        if (convenio) where.convenio = convenio;
        if (cpf) where.cpf = cpf;
        if (data_atualizacao) where.data_atualizacao = data_atualizacao;
        if (userTipousuario === 'PARCEIRO' && userPerfil === 'MATRIZ' || userTipousuario === 'PARCEIRO' && userPerfil === 'SUB ACESSO') where.cnpj = userCpf;
        if (userTipousuario === 'SUPERVISOR') where.supervisor = userNome;
        if (userTipousuario === 'GERENTE') where.gerente = userNome;

        try {
            const pesquisa = await margem_governo.findAll({
                where
            })
            if (pesquisa)
                return res.status(200).json(pesquisa)
        } catch (error) {
            console.log(error)
        }
    }

}
module.exports = MargemGovernoController;
