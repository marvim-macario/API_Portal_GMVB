const {
    propostas,
    vw_proposta,
    banco_origi,
    tipo,
    status,
    produto
} = require('../models');

const Sequelize = require('sequelize');
const Acesso = require('../modules/niveisdeAcesso');
const Op = Sequelize.Op;

const PropostaAguardandoController = {
    Banco: async (req, res) => {

        const bancos = await banco_origi.findAll({
            attributes: ['banco']
        });

        return res.json(bancos);

    },

    Tipo: async (req, res) => {

        const tipos = await tipo.findAll({
            attributes: ['tipo']
        });

        return res.json(tipos);
    },

    Status: async (req, res) => {

        const statuss = await status.findAll({
            attributes: ['status']
        });

        return res.json(statuss);
    },
    
    Produto: async (req, res) => {

        const produtos = await produto.findAll({
            attributes: ['produto']
        });

        return res.json(produtos);
    },

    Incluir: async (req, res) => {
        const {
            proposta,
            data_inclusao,
            mes,
            banco,
            produto,
            entregue,
            valor_troco,
            valor_parcela,
            tipo,
            salario,
            margem,
            parcela,
            forma_liberacao,
            seguro,
            agencia,
            taxaespecial,
            codigo_validacao,
            //Proposta portadas
            saque,
            valor_saque,
            primeiro_vencimento,
            ultimo_vencimento,
            parcela_refin1,
            parcela_refin2,
            parcela_refin3,
            parcela_refin4,
            parcela_refin5,
            parcela_refin6,
            //Formula de calculo
            cartao_m,
            banco_port1, //Banco portador
            status,
            sub_status,
            convenio,
            regra,
            especie,
            resultado_averbacao,
            observacao,
            nome, //nome cliente
            cpf,
            matricula,
            estado_civil,
            uf_naturalidade,
            naturalidade,
            rg,
            data_emissao,
            orgao_emissor,
            nome_mae,
            nome_pai,
            data_admissao,
            uf,
            municipio,
            cep,
            endereco,
            bairro,
            numero_endereco,
            complemento,
            tipo_conta,
            banco_cliente,
            agencia_cliente,
            conta_cliente,
            conjuge,
            data_nascimento,
            correntista,
            documento_uf,
            // codigo_profissao, Profissao
            telefone_tipo_1,
            telefone_ddd_1,
            telefone_numero_1,
            tipo_funcionario,
            email_cliente,
            // Tipo procedente  
            sistema_tel,
            // Usuario
            supervisor,
            empresa,
            // Tipo usuario
            cpf_supervisor,
            cpf_gerente,
            cpf_parceiro,
        } = req.body;

        const Incluir = await propostas.create({
            proposta,
            data_inclusao,
            mes,
            banco,
            produto,
            entregue,
            valor_troco,
            valor_parcela,
            tipo,
            salario,
            margem,
            parcela,
            forma_liberacao,
            seguro,
            agencia,
            taxaespecial,
            codigo_validacao,
            //Proposta portadas
            saque,
            valor_saque,
            primeiro_vencimento,
            ultimo_vencimento,
            parcela_refin1,
            parcela_refin2,
            parcela_refin3,
            parcela_refin4,
            parcela_refin5,
            parcela_refin6,
            //Formula de calculo
            cartao_m,
            banco_port1, //Banco portador
            status,
            sub_status,
            convenio,
            regra,
            especie,
            resultado_averbacao,
            observacao,
            nome, //nome cliente
            cpf,
            matricula,
            estado_civil,
            uf_naturalidade,
            naturalidade,
            rg,
            data_emissao,
            orgao_emissor,
            nome_mae,
            nome_pai,
            data_admissao,
            uf,
            municipio,
            cep,
            endereco,
            bairro,
            numero_endereco,
            complemento,
            tipo_conta,
            banco_cliente,
            agencia_cliente,
            conta_cliente,
            conjuge,
            data_nascimento,
            correntista,
            documento_uf,
            //codigo_profissao, // Profissao
            telefone_tipo_1,
            telefone_ddd_1,
            telefone_numero_1,
            tipo_funcionario,
            email_cliente,
            // Tipo procedente  
            sistema_tel,
            // Usuario
            supervisor,
            empresa,
            // Tipo usuario
            cpf_supervisor,
            cpf_gerente,
            cpf_parceiro,
        });
        return res.status(200).send(Incluir);
    },

    Anexo: async (req, res) => {
        const codigo = req.query.codigo;

        let {
            arquivo5,
            arquivo6,
            arquivo7,
            arquivo8,
            termo
        } = req.files;

        (arquivo5) ? arquivo5 = req.files.arquivo5[0].originalname : null;
        (arquivo6) ? arquivo6 = req.files.arquivo6[0].originalname : null;
        (arquivo7) ? arquivo7 = req.files.arquivo7[0].originalname : null;
        (arquivo8) ? arquivo8 = req.files.arquivo8[0].originalname : null;
        (termo) ? termo = req.files.termo[0].originalname : null;


        try {

            const resultData = await propostas.findOne({
                where: {codigo}
            });

            resultData.arquivo5 = arquivo5;
            resultData.arquivo6 = arquivo6;
            resultData.arquivo7 = arquivo7;
            resultData.arquivo8 = arquivo8;
            resultData.termo = termo;
            resultData.save();

            return res.json(resultData);
        } catch(error) {
            console.error(error);
        }


    },

    Filtro: async (req, res ) => {

        const {
            cpf,
            status,
            proposta,
            mes,
            tipo,
            data_inclusao,
            data_atualizacao,
            previsao_retorno,
            banco,
            produto,
            userPerfil,
            userCpf,
            userTipousuario,
            userNome,
            userCnpjMatriz,
            parceiro
        } = req.body;

        let where = Acesso(userPerfil, userCpf, userTipousuario, userNome, userCnpjMatriz)

        if (parceiro) where.parceiro = {
            [Op.like]: parceiro
        }
        if (cpf) where.cpf = cpf;
        if (status) where.status = status;
        if (proposta) where.proposta = proposta;
        if (mes) where.mes = mes;
        if (tipo) where.tipo = tipo;
        if (data_inclusao) where.data_inclusao = data_inclusao;
        if (data_atualizacao) where.data_atualizacao = data_atualizacao;
        if (previsao_retorno) where.previsao_retorno = previsao_retorno;
        if (banco) where.banco = banco;
        if (produto) where.produto = produto;

        try {
            const filtro = await propostas.findAll({ 
                where
            })

            res.status(200).json(filtro)

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = PropostaAguardandoController;