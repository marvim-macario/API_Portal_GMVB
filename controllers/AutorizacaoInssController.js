const {
    inss_sms
} = require('../models/');
const Sequelize = require('sequelize');
const {
    where
} = require('sequelize');
const Op = Sequelize.Op;

const AutorizacaoInssController = {
    Filtro: async (req, res) => {
        const {
            userTipousuario,
            userPerfil,
            userCpf,
            parceiro,
            status_inss,
            cpf,
            data_alteracao,
            data_cadastro
        } = req.body;

        let where = {};
        if (status_inss) where.status_inss = status_inss;
        if (parceiro) where.parceiro = parceiro;
        if (cpf) where.cpf = cpf;
        if (data_alteracao) where.data_alteracao = data_alteracao;
        if (data_cadastro) where.data_cadastro = data_cadastro
        if (userTipousuario === 'PARCEIRO' && userPerfil === 'MATRIZ' || userTipousuario === 'PARCEIRO' && userPerfil === 'SUB ACESSO') where.cnpj = userCpf;


        try {
            const alreadyFiltroExists = await inss_sms.findAll({
                where
            })


            if (alreadyFiltroExists) {
                return res.status(200).json(alreadyFiltroExists);
            }

            return res.json({
                message: "Filtro inexistente"
            })
        } catch (error) {
            console.log(error)
        }

    },

    Modal: async (req, res) => {
        const codigo = req.body.codigo

        const alreadyCodsExists = await inss_sms.findOne({
            where: {
                codigo
            }
        })

        if (alreadyCodsExists)
            return res.status(200).json(alreadyCodsExists);

        return res.json({
            message: "Id does not exists"
        })

    },

    Inserir: async (req, res) => {
        const {
            data_cadastro,
            parceiro,
            cpf,
            nome,
            telefone,
            status_inss
        } = req.body

        const insertAutorizacaoInss = await inss_sms.create({
            data_cadastro,
            parceiro,
            cpf,
            nome,
            telefone,
            status_inss
        })

        return res.status(200).json(insertAutorizacaoInss)
    },

    Anexo: async (req, res) => {
        const {
            codigo
        } = req.query;

        const {
            anexo_print_margem
        } = req.file;

        const arquivo1 = req.file.originalname;

        const autorizacaoInss = await inss_sms.findOne({
            where: {
                codigo
            }
        })

        if (autorizacaoInss) {
            autorizacaoInss.arquivo1 = arquivo1;
            autorizacaoInss.save();

            return res.status(200).json(autorizacaoInss)
        }

        return res.json({
            message: "Código para inserir arquivo não existe"
        })
    },

    Atualizar: async (req, res) => {
        const {
            codigo,
            status_inss
        } = req.body;

        const autorizacaoInssExists = await inss_sms.findOne({
            where: {
                codigo
            }
        })

        if (!autorizacaoInssExists) {
            return res.json({
                message: "Autorização INSS inexistente"
            })
        }


        autorizacaoInssExists.status_inss = status_inss;
        autorizacaoInssExists.save();
        
        return res.status(200).json(autorizacaoInssExists)
    }

}

module.exports = AutorizacaoInssController;