const {
    relatorio_sms
} = require('../models');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const RelatorioLogsController = {
    Buscar: async (req, res) => {
        let where = {
            tipo: "",
            mes: "",
            status: "",
        }
        try {

            where = {
                ...req.body
            };

            const query = `%${where.mes}`

            (where.status) ? where.status: delete where.status;
            (where.mes) ? where.mes = {
                [Op.like]: query
            }: delete where.mes;
            (where.tipo) ? where.tipo: delete where.tipo;

            console.log(where);

            const logs = await relatorio_sms.findAll({
                where
            })

            return res.status(200).json(logs);

        } catch (error) {
            return res.status(400).json({
                message: "Lista Vazia"
            })
        }
    }
}

module.exports = RelatorioLogsController