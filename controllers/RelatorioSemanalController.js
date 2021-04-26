const {
    proposta_campanha, faixa_campanha
} = require('../models');

const Sequelize = require('sequelize');

const RelatorioSemanalController = {

    Lista: async(req, res) =>{
        const {cnpj, semana} = req.body;

        const lista = await proposta_campanha.findAll({
            where:{
                cnpj: cnpj,
                semana: semana
            }
        })
        return res.status(200).json(lista)
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