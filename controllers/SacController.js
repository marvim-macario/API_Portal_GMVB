const {
    sac
} = require('../models');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Acesso = require('../modules/niveisdeAcesso.js')

const SacController = {
    Filtro: async (req, res) => {

        const {
            classificacao,
            status,
            banco,
            data_recebimento,
            data_inclusao,
            data_resposta,
            cpf,
            parceiro,
            protocolo,
            // userPerfil,
            // userCpf,
            // userTipousuario,
            // userNome,
            // userCnpjMatriz
        } = req.body;

        // let where = Acesso(userPerfil, userCpf, userTipousuario, userNome, userCnpjMatriz)
        let where = {}
        if (parceiro) where.parceiro = {
            [Op.like]: parceiro
        }
        if (classificacao) where.classificacao = classificacao;
        if (data_recebimento) where.data_recebimento = data_recebimento;
        if (data_inclusao) where.data_inclusao = data_inclusao;
        if (status) where.status = status;
        if (data_resposta) where.data_resposta = data_resposta;
        if (protocolo) where.protocolo = protocolo;
        if (cpf) where.cpf = cpf;
        if (banco) where.banco = banco;

        try {
            const filtroExiste = await sac.findAll({
                where
            })

            res.status(200).json(filtroExiste)

        } catch (error) {
            console.log(error)
        }

    },
    
    IncluirSac: async (req, res) => {
        const {
            nome,
            cpf,
            telefone,
            email,
            data_recebimento,
            data_inclusao,
            data_resposta,
            resposta,
            questionamento,
            banco,
            data_alteracao,
            responsavel,
            protocolo,
            classificacao,
            valor_operacao,
            contrato,
            parceiro,
            supervisor,
            gerente,
            tempo_atuacao,
            arquivo2,
            arquivo1,
            mes,
            arquivo3,
            arquivo4,
            protocolo_banco,
            procedente,
            empresa,
            cpf_parceiro,
            cpf_supervisor,
            cpf_gerente,
            id_acesso
        } = req.body;

        const IncluirSac = await sac.create({
            nome: nome,
            cpf: cpf,
            telefone: telefone,
            email: email,
            data_recebimento: data_recebimento,
            data_inclusao: data_inclusao,
            data_resposta: data_resposta,
            resposta: resposta,
            questionamento: questionamento,
            banco: banco,
            status: "EM ANDAMENTO",
            data_alteracao: data_alteracao,
            responsavel: responsavel,
            protocolo: protocolo,
            classificacao: classificacao,
            valor_operacao: valor_operacao,
            contrato: contrato,
            parceiro: parceiro,
            supervisor: supervisor,
            gerente: gerente,
            tempo_atuacao: tempo_atuacao,
            arquivo2: arquivo2,
            arquivo1: arquivo1,
            mes: mes,
            arquivo3: arquivo3,
            arquivo4: arquivo4,
            protocolo_banco: protocolo_banco,
            procedente: procedente,
            empresa: empresa,
            cpf_parceiro: cpf_parceiro,
            cpf_supervisor: cpf_supervisor,
            cpf_gerente: cpf_gerente,
            id_acesso: id_acesso
        });

        return res.status(200).send(IncluirSac);
    },

    Atualizar: async (req, res) => {
        const codigo_sac = req.body.id_sac;

        const {
            nome,
            cpf,
            telefone,
            email,
            data_recebimento,
            data_resposta,
            resposta,
            questionamento,
            banco,
            data_alteracao,
            responsavel,
            protocolo,
            classificacao,
            valor_operacao,
            contrato,
            tempo_atuacao,
            protocolo_banco,
            procedente,
            empresa
        } = req.body;

        const IncluirSac = await sac.findOne({
            where: {
                id_sac: codigo_sac
            }
        });

        if (IncluirSac) {
            IncluirSac.nome = nome
            IncluirSac.cpf = cpf
            IncluirSac.telefone = telefone
            IncluirSac.email = email
            IncluirSac.data_recebimento = data_recebimento
            IncluirSac.data_resposta = data_resposta
            IncluirSac.resposta = resposta
            IncluirSac.questionamento = questionamento
            IncluirSac.banco = banco
            IncluirSac.data_alteracao = data_alteracao
            IncluirSac.responsavel = responsavel
            IncluirSac.protocolo = protocolo
            IncluirSac.classificacao = classificacao
            IncluirSac.valor_operacao = valor_operacao
            IncluirSac.contrato = contrato
            IncluirSac.tempo_atuacao = tempo_atuacao
            IncluirSac.protocolo_banco = protocolo_banco
            IncluirSac.procedente = procedente
            IncluirSac.empresa = empresa
            IncluirSac.status = "RESPONDIDO"

            IncluirSac.save();
            return res.status(200).json(IncluirSac);
        }

        return res.status(401).json({
            message: "Ocorreu um erro durante a atualização"
        })

    },

    Anexo: async (req, res) => {
        let {
            arquivo1,
            arquivo2,
            arquivo3,
            arquivo4
        } = req.files;


        const {
            id_sac
        } = req.query;

        (arquivo1) ? arquivo1 = req.files.arquivo1[0].originalname: arquivo1 = null;
        (arquivo2) ? arquivo2 = req.files.arquivo2[0].originalname: arquivo2 = null;
        (arquivo3) ? arquivo3 = req.files.arquivo3[0].originalname: arquivo3 = null;
        (arquivo4) ? arquivo4 = req.files.arquivo4[0].originalname: arquivo4 = null;

        try {
            const Sac = await sac.findOne({
                where: {
                    id_sac: id_sac
                }
            })

            if (Sac) {
                Sac.arquivo1 = arquivo1
                Sac.arquivo2 = arquivo2
                Sac.arquivo3 = arquivo3
                Sac.arquivo4 = arquivo4

                Sac.save()
                return res.json(Sac)
            }
        } catch (error) {
            console.log(error)
        }
    },



}

module.exports = SacController;