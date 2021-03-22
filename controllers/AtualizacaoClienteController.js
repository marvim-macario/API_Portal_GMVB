const {
    atualizacao_cliente
} = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const AtualizacaoClienteController = {
    Filtro: async (req, res) => {
        const {
            userTipousuario,
            userPerfil,
            userCpf,
            tipo,
            cpf,
            status
        } = req.body


        let where = {};
        if (status) where.status = status;
        if (tipo) where.tipo = tipo;
        if (cpf) where.cpf = cpf
        if (userTipousuario === 'PARCEIRO' && userPerfil === 'MATRIZ' || userTipousuario === 'PARCEIRO' && userPerfil === 'SUB ACESSO') where.cnpj = userCpf;

        try {
            const pesquisa = await atualizacao_cliente.findAll({
                where
            })

            if (pesquisa)
                return res.status(200).json(pesquisa);

            return res.json({
                message: "Filtro inexistente"
            })
        } catch (error) {
            console.log(error)
        }

    },

    Inserir: async (req, res) => {
        const {
            data_cadastro,
            status,
            sub_status,
            tipo_atualizacao,
            correntista,
            cpf,
            nome,
            parceiro,
            supervisor,
            gerente,
            obs,
            data_inclusao,
            id_acesso,
            cpf_supervisor,
            cpf_gerente,
            cpf_parceiro,
        } = req.body

        let where = {}

        data_cadastro ? where.data_cadastro = data_cadastro : where.data_cadastro = ""
        status ? where.status = status : where.status = ""
        sub_status ? where.sub_status = sub_status : where.sub_status = ""
        tipo_atualizacao ? where.tipo = tipo_atualizacao : where.tipo = ""
        correntista ? where.correntista = correntista : where.correntista = ""
        cpf ? where.cpf = cpf : where.cpf = ""
        nome ? where.nome = nome : where.nome = ""
        parceiro ? where.parceiro = parceiro : where.parceiro = ""
        supervisor ? where.supervisor = supervisor : where.supervisor = ""
        gerente ? where.gerente = gerente : where.gerente = ""
        obs ? where.obs = obs : where.obs = ""
        data_inclusao ? where.data_inclusao = data_inclusao  : where.data_inclusao = ""
        id_acesso ? where.id_acesso = id_acesso  : where.id_acesso = ""
        cpf_supervisor ? where.cpf_supervisor = cpf_supervisor  : where.cpf_supervisor = ""
        cpf_gerente ? where.cpf_gerente = cpf_gerente : where.cpf_gerente = ""
        cpf_parceiro ? where.cpf_parceiro = cpf_parceiro : where.cpf_parceiro = ""

        const atualizacaoCliente = await atualizacao_cliente.create(where)

        return res.json(atualizacaoCliente)
    },

    Anexo: async (req, res) => {
        const {
            codigo
        } = req.query;

        var {
            identificacao,
            endereco,
            renda
        } = req.files;


        (identificacao) ? identificacao = req.files.identificacao[0].originalname: identificacao = null;
        (endereco) ? endereco = req.files.endereco[0].originalname: endereco = null;
        (renda) ? renda = req.files.renda[0].originalname: renda = null;

        const alreadyClientExists = await atualizacao_cliente.findOne({
            where: {
                codigo: codigo
            }
        })

        if (alreadyClientExists) {
            alreadyClientExists.arquivo1 = identificacao
            alreadyClientExists.arquivo2 = endereco
            alreadyClientExists.arquivo3 = renda

            alreadyClientExists.save()

            return res.json(alreadyClientExists)
        }

        return res.end('Código não existe')
    },

    Modal: async (req, res) => {
        const {
            codigo
        } = req.body

        const alreadyCodigoExists = await atualizacao_cliente.findOne({
            where: {
                codigo
            }
        })

        if (!alreadyCodigoExists) {
            return res.json({
                message: "Cod does not exists"
            });
        }

        return res.json(alreadyCodigoExists);
    },

    Atualizar: async (req, res) => {
        const {
            codigo,
            data_cadastro,
            status,
            sub_status,
            tipo_atualizacao,
            correntista,
            cpf,
            nome,
            obs,
            responsavel,
            data_atualizacao
        } = req.body;

        const alreadyIdExists = await atualizacao_cliente.findOne({
            where: {
                codigo: codigo
            }
        })

        if (!alreadyIdExists) {
            return res.json({
                message: "Cadastro inexistente"
            })
        }

        const data = new Date();


        alreadyIdExists.data_cadastro = data_cadastro;
        alreadyIdExists.status = status;
        alreadyIdExists.sub_status = sub_status;
        alreadyIdExists.tipo_atualizacao = tipo_atualizacao;
        alreadyIdExists.correntista = correntista;
        alreadyIdExists.cpf = cpf;
        alreadyIdExists.nome = nome;
        alreadyIdExists.obs = obs;
        alreadyIdExists.data_atualizacao = data_atualizacao;
        alreadyIdExists.responsavel = responsavel

        alreadyIdExists.save();
        return res.json(alreadyIdExists);

    },

}

module.exports = AtualizacaoClienteController;