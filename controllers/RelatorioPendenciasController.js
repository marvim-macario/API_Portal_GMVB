const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const {
    relatorio_pendencia
} = require('../models');

const RelatorioPendenciasController = {
    Usuario: async (req, res) => {
        const supervisor = req.body.supervisor;

        console.log(supervisor);

        const listaParceiros = await relatorio_pendencia.findAll({
            where: {
                supervisor
            },
            attributes: ['parceiro'],
        })

        return res.json(listaParceiros);
    },

    Buscar: async (req, res) => {
        const {
            parceiro,
            tipo,
            banco_origi,
            status,
            produto,
            supervisor,
            mes
        } = req.body;

        let where = {}
        if (parceiro) where.parceiro = parceiro;
        if (tipo) where.tipo = tipo;
        if (banco_origi) where.banco_origi = banco_origi;
        if (status) where.status = status;
        if (produto) where.produto = produto;
        if (supervisor) where.supervisor = supervisor;
        if (mes) where.mes = mes;

        try {
            const buscar = await relatorio_pendencia.findAll({
                where
            })
            res.status(200).json(buscar);
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = RelatorioPendenciasController;