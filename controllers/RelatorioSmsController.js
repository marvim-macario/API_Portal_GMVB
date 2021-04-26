const {
    status_sms
} = require('../models');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const RelatorioSmsController = {
    SubStatus: async (req, res) => {
        try {
            const substatus = await status_sms.findAll({
                attributes: [
                    [Sequelize.fn('DISTINCT', Sequelize.col('sub_status')), 'sub_status']
                ]

            })

            return res.status(200).json(substatus);
        } catch (error) {
            return res.status(400).json({
                error
            });
        }
    },

    Buscar: async (req, res) => {
        let where = {
            sub_status: "",
            data_log: "",
            empresa_sms:""
        }

        try {
            where = {
                ...req.body
            }

            const query = `%${where.data_log}%`;

            (where.sub_status) ? where.sub_status: delete where.sub_status;
            (where.data_log) ? where.data_log = {
                [Op.like]: query
            }: delete where.data_log;
            (where.empresa_sms) ? where.empresa_sms: delete where.empresa_sms;

            const filtro = await status_sms.findAll({
                where
            })

            return res.status(200).json(filtro);

        } catch(error) {
            return res.status(400).json({
                error: "Error durante a consulta"+error
            })
        }
    }
}

module.exports = RelatorioSmsController;