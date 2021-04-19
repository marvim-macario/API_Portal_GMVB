const {
    proposta_campanha,
    faixa_campanha
} = require('../models');

const RelatorioSemanalController = {
    Lista: async (req, res) => {
        try {
            const propostas = await proposta_campanha.findAll({
                where: req.body
            });
            return res.status(200).json(propostas);
        } catch (error) {
            return res.status(400).json({
                error_message: error
            })
        }
    },

    Faixa: async (req, res) => {
        try {
            const faixa = await faixa_campanha.findAll({
                where: {
                    mes: `${new Date().getMonth()+1}/${new Date().getFullYear()}`
                }
            })

            return res.status(200).json(faixa);
        } catch(error) {
            return res.status(400).json(error);
        }
    }
}

module.exports = RelatorioSemanalController;