const {
    lancamentos,
    cadastro
} = require('../models');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const LancamentosController = {
    IncluirLancamento: async (req, res) => {
        const {
            data_movimento,
            ref,
            banco,
            filial,
            uf,
            grupo,
            sub_grupo,
            projeto,
            cnpj,
            parceiro,
            cpf,
            favorecido,
            supervisor,
            gerente,
            tipo_pagamento,
            banco_parceiro,
            agencia_parceiro,
            conta_parceiro,
            numero_cartao,
            solicitante,
            descricao,
            obs,
            valor,
            empresa,
            data_cadastro,
            data_alteracao,
            responsavel,
            tp_lancamento,
            cod_lancamento,
            arquivo1,
            arquivo2,
            arquivo3,
            arquivo4,
            codigo_barra,
            digitacao,
            data_vencimento,
            status_pag,
            tipo_lancamento,
            tipo_funcionario,
            tipo_despesa,
            cpf_parceiro,
            cpf_supervisor,
            cpf_gerente,
            id_acesso
        } = req.body;

        const IncluirLancamento = await lancamentos.create({
            data_movimento:data_movimento,
            ref:ref,
            banco:banco,
            filial:filial,
            uf:uf,
            grupo:grupo,
            sub_grupo:sub_grupo,
            projeto:projeto,
            cnpj:cnpj,
            parceiro:parceiro,
            cpf:cpf,
            favorecido:favorecido,
            supervisor:supervisor,
            gerente:gerente,
            tipo_pagamento:tipo_pagamento,
            banco_parceiro:banco_parceiro,
            agencia_parceiro:agencia_parceiro,
            conta_parceiro:conta_parceiro,
            numero_cartao:numero_cartao,
            solicitante:solicitante,
            descricao:descricao,
            obs:obs,
            valor:valor,
            empresa:empresa,
            data_cadastro:data_cadastro,
            data_alteracao:data_alteracao,
            responsavel:responsavel,
            tp_lancamento:tp_lancamento,
            cod_lancamento:cod_lancamento,
            arquivo1:arquivo1,
            arquivo2:arquivo2,
            arquivo3:arquivo3,
            arquivo4:arquivo4,
            codigo_barra:codigo_barra,
            digitacao:digitacao,
            data_vencimento:data_vencimento,
            status_pag:status_pag,
            tipo_lancamento:tipo_lancamento,
            tipo_funcionario:tipo_funcionario,
            tipo_despesa:tipo_despesa,
            cpf_parceiro:cpf_parceiro,
            cpf_supervisor:cpf_supervisor,
            cpf_gerente:cpf_gerente,
            id_acesso:id_acesso
        });
        return res.status(200).send(IncluirLancamento);
    },

    Filtro: async (req, res) => {
        const {
            data_cadastro,
            ref,
            banco,
            filial,
            uf,
            grupo,
            sub_grupo,
            cnpj,
            parceiro,
            supervisor,
            gerente,
            cpf,
            favorecido,
            solicitante,
            projeto,
            empresa,
            tipo_despesa,
            cod_lancamento
        } = req.body;

        let where = {}

        if (parceiro) where.parceiro = {
            [Op.like]: parceiro
        }

        if (data_cadastro) where.data_cadastro = data_cadastro;
        if (ref) where.ref = ref;
        if (filial) where.filial = filial;
        if (gerente) where.gerente = gerente;
        if (supervisor) where.supervisor = supervisor;
        if (grupo) where.grupo = grupo;
        if (cpf) where.cpf = cpf;
        if (sub_grupo) where.sub_grupo = sub_grupo;
        if (cnpj) where.cnpj = cnpj;
        if (favorecido) where.favorecido = favorecido;
        if (solicitante) where.solicitante = solicitante;
        if (uf) where.uf = uf;
        if (projeto) where.projeto = projeto;
        if (banco) where.banco = banco;
        if (empresa) where.empresa = empresa;
        if (tipo_despesa) where.tipo_despesa = tipo_despesa;
        if (cod_lancamento) where.cod_lancamento = cod_lancamento;


        try {
            const filtroExiste = await lancamentos.findAll({
                where
            })

            filtroExiste.length > 0 ? res.status(200).json(filtroExiste) : res.status(401).json({message: "Filtro não existe"})

        } catch (error) {
            console.log("Ops! Deu ruim durante a execução",error)
        }
    },

    BuscarCnpj: async (req, res) => {
        const cnpj = req.body.cnpj;


        const buscaNaCadastro = await cadastro.findOne({
            attributes: ['parceiro', 'supervisor', 'gerente', 'cpf', 'nome_completo', 'tipo_pgto', 'banco', 'agencia', 'conta', 'numero_cartao'],

            where: {
                cnpj
            },

            order: [
                ['classificacao', 'asc'],
                ['status', 'asc']
            ]
        })

        if(buscaNaCadastro) 
            return res.status(200).json(buscaNaCadastro);

        //Caso n ache nesta tabela
        const buscaNaLancamento = await lancamentos.findOne({
            attributes: ['parceiro', 'supervisor', 'gerente', 'cpf', 'favorecido', 'tipo_pagamento', 'banco_parceiro', 'agencia_parceiro', 'conta_parceiro', 'numero_cartao'],

            where: {
                cnpj
            },
        })

        if(buscaNaLancamento) 
            return res.status(200).json(buscaNaLancamento);

        
        return res.status(400).json({
            message: "Não encontramos estes dados"
        })
    },

    Alterar: async (req, res) => {
        const {
            id_lancamento,
            data_movimento,
            ref,
            empresa,
            filial,
            uf,
            grupo,
            sub_grupo,
            projeto,
            cnpj,
            parceiro,
            supervisor,
            gerente,
            cpf,
            favorecido,
            tipo_pagamento,
            banco_parceiro,
            agencia_parceiro,
            conta_parceiro,
            numero_cartao,
            tp_lancamento,
            cod_lancamento,
            solicitante,
            valor,
            data_vencimento,
            descricao,
            obs,
            responsavel,
            data_atualizacao
        } = req.body;

        try{
            const BuscaLancamento = await lancamentos.findOne({
                where: {
                    id_lancamento
                }
            })

            if (!BuscaLancamento) {
                return res.send("Lancamento inexistente")
            }

            BuscaLancamento.data_movimento = data_movimento
            //competencia
            BuscaLancamento.empresa = empresa
            BuscaLancamento.filial = filial
            BuscaLancamento.ref = ref
            BuscaLancamento.uf = uf
            BuscaLancamento.grupo = grupo
            BuscaLancamento.sub_grupo = sub_grupo
            BuscaLancamento.projeto = projeto
            BuscaLancamento.cnpj = cnpj
            BuscaLancamento.parceiro = parceiro
            BuscaLancamento.supervisor = supervisor
            BuscaLancamento.gerente = gerente
            BuscaLancamento.cpf = cpf
            BuscaLancamento.favorecido = favorecido
            BuscaLancamento.tipo_pagamento = tipo_pagamento
            BuscaLancamento.banco_parceiro = banco_parceiro
            BuscaLancamento.agencia_parceiro = agencia_parceiro
            BuscaLancamento.conta_parceiro = conta_parceiro
            BuscaLancamento.numero_cartao = numero_cartao
            BuscaLancamento.tp_lancamento = tp_lancamento
            BuscaLancamento.cod_lancamento = cod_lancamento
            BuscaLancamento.solicitante = solicitante
            BuscaLancamento.valor = valor
            BuscaLancamento.data_vencimento = data_vencimento
            BuscaLancamento.descricao = descricao
            BuscaLancamento.obs = obs
            BuscaLancamento.responsavel = responsavel
            BuscaLancamento.data_atualizacao = data_atualizacao
            BuscaLancamento.save()
            return res.status(200).json(BuscaLancamento)

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = LancamentosController;