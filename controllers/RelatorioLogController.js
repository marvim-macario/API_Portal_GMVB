const {
    relatorio_sms
} = require('../models/');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const RelatorioLogController = {

    Filtro: async (req, res) => {
        const {
            status,
            tipo,
            mes
        } = req.body

        let where = {};
        if(status) where.status = status;
        if(tipo) where.tipo = tipo;
        if(mes) where.mes = mes;

        try{
            const filtro = await relatorio_sms.findAll({where})
            if(filtro)
            return res.status(200).json(filtro)
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = RelatorioLogController;