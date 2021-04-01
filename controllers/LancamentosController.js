const {
    lancamentos
} = require('../models');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const LancamentosController = {
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

    }
}

module.exports = LancamentosController;