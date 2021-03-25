const {
    imobiliario,
    logs_imobiliario
} = require('../models/')
const Sequelize = require('sequelize');
const Op = Sequelize.Op

const Acesso = require('../modules/niveisdeAcesso.js')


const ImobiliarioController = {
    Pesquisar: async (req, res) => {
        const {
            userPerfil,
            userCpf,
            userTipousuario,
            userNome,
            userCnpjMatriz,
            parceiro,
            nome_operador,
            gerente,
            supervisor,
            status,
            imovel,
            tipo_imovel,
            cpf,
            proposta,
            data_retorno,
            nome,
            modalidade,
            uf,
            identificacao_imovel,
            banco
        } = req.body;
        console.log(req.body)

        let where = Acesso(userPerfil, userCpf, userTipousuario, userNome, userCnpjMatriz)

        if (parceiro) where.parceiro = {
            [Op.like]: parceiro
        }
        if (nome_operador) where.nome_operador = nome_operador;
        if (gerente) where.gerente = gerente;
        if (supervisor) where.supervisor = supervisor;
        if (status) where.status = status;
        if (imovel) where.imovel = imovel;
        if (tipo_imovel) where.tipo_imovel = tipo_imovel;
        if (cpf) where.cpf = cpf;
        if (proposta) where.proposta = proposta;
        if (data_retorno) where.data_retorno = data_retorno;
        if (nome) where.nome = nome;
        if (modalidade) where.modalidade = modalidade;
        if (uf) where.uf = uf;
        if (identificacao_imovel) where.identificacao_imovel = identificacao_imovel;
        if (banco) where.banco = banco;

        console.log(where)
        try {
            const pesquisaImobiliario = await imobiliario.findAll({
                where
            })
            res.status(200).send(pesquisaImobiliario);
        } catch (error) {
            console.log(error)
        }



    },
    Incluir: async (req, res) => {
        const {
            proposta,
            data_solicitacao,
            valor_financiado,
            modalidade,
            status,
            tipo_imovel,
            banco,
            telefone_promotor,
            autorizacao,
            data_retorno,
            nome,
            cpf,
            data_nascimento,
            uf,
            telefone,
            telefone_alternativo,
            parceiro,
            supervisor,
            gerente,
            nome_operador
        } = req.body;


        try {


            const created = await imobiliario.create({
                proposta,
                data_solicitacao,
                valor_financiado,
                modalidade,
                status,
                tipo_imovel,
                banco,
                telefone_promotor,
                autorizacao,
                data_retorno,
                nome,
                cpf,
                data_nascimento,
                uf,
                telefone,
                telefone_alternativo,
                parceiro,
                supervisor,
                gerente,
                nome_operador
            })

            if (created)
                return res.status(201).send(created);

        } catch (error) {
            console.log(error)
        }



    },

    IncluirArquivos: async (req, res) => {
        let {
            minuta,
            comprovanteEstadoCivil,
            comprovanteResidencia,
            extratobancario1,
            extatobancario2,
            extratobancario3,
            outros5,
            outros6,
            outros7
        } = req.files;
        const {
            proposta,
            data_solicitacao,
            valor_financiado,
            modalidade,
            status,
            tipo_imovel,
            banco,
            telefone_promotor,
            autorizacao,
            data_retorno,
            nome,
            cpf,
            data_nascimento,
            uf,
            telefone,
            telefone_alternativo,
            parceiro,
            supervisor,
            gerente,
            nome_operador,
            observacao
        } = req.body;



        (minuta) ? minuta = req.files.minuta[0].originalname: minuta = null;
        (comprovanteEstadoCivil) ? comprovanteEstadoCivil = req.files.comprovanteEstadoCivil[0].originalname: comprovanteEstadoCivil = null;
        (comprovanteResidencia) ? comprovanteResidencia = req.files.comprovanteResidencia[0].originalname: comprovanteResidencia = null;
        (extratobancario1) ? extratobancario1 = req.files.extratobancario1[0].originalname: extratobancario1 = null;
        (extatobancario2) ? extratobancario2 = req.files.extratobancario2[0].originalname: extratobancario2 = null;
        (extratobancario3) ? extratobancario3 = req.files.extratobancario3[0].originalname: extratobancario3 = null;
        (outros5) ? outros5 = req.files.outros5[0].originalname: outros5 = null;
        (outros6) ? outros6 = req.files.outros6[0].originalname: outros6 = null;
        (outros7) ? outros7 = req.files.outros7[0].originalname: outros7 = null;

        try {


            const created = await imobiliario.create({
                proposta,
                data_solicitacao,
                valor_financiado,
                modalidade,
                status,
                tipo_imovel,
                banco,
                telefone_promotor,
                autorizacao,
                data_retorno,
                nome,
                cpf,
                data_nascimento,
                uf,
                telefone,
                telefone_alternativo,
                parceiro,
                supervisor,
                gerente,
                nome_operador,
                observacao,
                arquivo1: minuta,
                arquivo2: comprovanteEstadoCivil,
                arquivo3: comprovanteResidencia,
                arquivo5: extratobancario1,
                arquivo6: extatobancario2,
                arquivo7: extratobancario3,
                arquivo8: outros5,
                arquivo9: outros6,
                arquivo10: outros7
            })

            if (created)
                res.status(201).send(created)


        } catch (error) {
            console.log(error)
            //   res.send(error)
        }


    },

    StatusImobiliario: async (req, res) => {
        const listaStatus = await imobiliario.findAll({
            attributes: [
                // specify an array where the first element is the SQL function and the second is the alias
                [Sequelize.fn('DISTINCT', Sequelize.col('status')), 'status']
            ]
        })

        return res.status(200).json(listaStatus);
    },

    ImovelImobiliario: async (req, res) => {
        const listaImovel = await imobiliario.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('imovel')), 'imovel']
            ]
        })

        return res.status(200).json(listaImovel);
    },

    BuscaLogs: async (req, res) => {
        const codigo = req.body.codigo;

        const listaLogs = await logs_imobiliario.findAll({
            where: {
                codigo: codigo
            }
        })

        if (listaLogs.length > 0) {
            return res.status(200).json(listaLogs);
        }

        return res.status(400).json({
            message: "Log não encontrado"
        })

    },

    Alterar: async (req, res) => {
        const{
            codigo,
            proposta,
            data_solicitacao,
            valor_financiado,
            modalidade,
            status,
            tipo_imovel,
            banco,
            telefone_promotor,
            autorizacao,
            data_retorno,
            nome,
            cpf,
            data_nascimento,
            uf,
            telefone,
            telefone_alternativo,
            responsavel,
            data_atualizacao
        }= req.body

        try {
            const BuscaImobiliario = await imobiliario.findOne({
                where: {
                    codigo
                }
            })

            if(!BuscaImobiliario){
                return res.send("Imobiliario inexistente")
            }
            BuscaImobiliario.proposta = proposta
            BuscaImobiliario.data_solicitacao = data_solicitacao
            BuscaImobiliario.valor_financiado = valor_financiado
            BuscaImobiliario.modalidade = modalidade
            BuscaImobiliario.status = status
            BuscaImobiliario.tipo_imovel = tipo_imovel
            BuscaImobiliario.banco = banco
            BuscaImobiliario.telefone_promotor = telefone_promotor
            BuscaImobiliario.autorizacao = autorizacao
            BuscaImobiliario.data_retorno = data_retorno
            BuscaImobiliario.nome = nome
            BuscaImobiliario.cpf = cpf
            BuscaImobiliario.data_nascimento = data_nascimento
            BuscaImobiliario.uf = uf
            BuscaImobiliario.telefone = telefone
            BuscaImobiliario.telefone_alternativo = telefone_alternativo
            BuscaImobiliario.responsavel = responsavel
            BuscaImobiliario.data_atualizacao = data_atualizacao
            BuscaImobiliario.save()
            return res.status(200).json(BuscaImobiliario)
        } catch (error) {
            
        }
    }
}

module.exports = ImobiliarioController