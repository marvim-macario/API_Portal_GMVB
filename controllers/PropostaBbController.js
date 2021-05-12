const {
    propostas_bb
} = require('../models');

const Sequelize = require('sequelize');

const PropostaBbController = {
    Venda: async (req, res) => {
        const result = await propostas_bb.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('tipo_operacao')), 'tipo_operacao']
            ],

            order: [
                ['tipo_operacao', 'DESC']
            ]
        });

        const resultOfFilter = result.filter(item => item.tipo_operacao !== null && item.tipo_operacao !== "");

        return res.json(resultOfFilter);
    },

    Operador: async (req, res) => {
        const result = await propostas_bb.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('usuario')), 'usuario']
            ],

            order: [
                ['usuario', 'DESC']
            ]
        })

        // console.log(result[result.length -1].usuario !== null);
        const resultOfFilter = result.filter(item => item.dataValues.usuario !== null && item.dataValues.usuario !== '');
        return res.json(resultOfFilter);
    },

    Tipo: async (req, res) => {
        const result = await propostas_bb.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('tipo')), 'tipo']
            ],

            order: [
                ['tipo', 'DESC']
            ]
        })

        const resultOfFilter = result.filter(item => item.tipo !== null && item.tipo !== "");

        return res.json(resultOfFilter);
    },

    Mes: async (req, res) => {
        const result = await propostas_bb.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('mes')), 'mes']
            ],

            order: [
                ['mes', 'DESC']
            ]
        });

        const resultOfFilter = result.filter(item => item.mes !== null && item.mes !== "");

        return res.json(resultOfFilter);
    },

    Supervisor: async (req, res) => {
        const Supervisor = await propostas_bb.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('supervisor')), 'supervisor']
            ],

            order: [
                ['supervisor', 'DESC']
            ]
        });
        res.status(200).send(Supervisor);
    },

    StatusAuditoria: async (req, res) => {
        const StatusAuditoria = await propostas_bb.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('status_auditoria')), 'status_auditoria']
            ],

            order: [
                ['status_auditoria', 'DESC']
            ]
        });
        res.status(200).send(StatusAuditoria);
    },

    StatusProposta: async (req, res) => {
        const StatusProposta = await propostas_bb.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('status')), 'status']
            ],

            order: [
                ['status', 'DESC']
            ]
        })
        res.status(200).send(StatusProposta);
    },

    Filtro: async (req, res) => {
        try {
            let objFields = {
                ...req.body
            };
            console.log(objFields);

            const result = await propostas_bb.findAll({
                where: {
                    ...objFields
                }
            })

            return res.json(result);

        } catch (error) {
            console.error(error);
        }
    }

}

module.exports = PropostaBbController;