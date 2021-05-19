const {
    usuario_mes2,
    setor_usuario2,
    usuario_dia2
} = require('../models');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const TblUsuarioController = {
    FiltroSetor: async (req, res) => {
        
        const {
            supervisor,
            nivel
        } = req.body;

        let where = {};
        if (supervisor) where.supervisor = supervisor;
        if (nivel) where.nivel = nivel;

        try {
            
            const pesquisaSetor = await setor_usuario2.findAll({
                where
            });

            (pesquisaSetor.length > 0 ) ? res.json({
                pesquisaSetor,
            }): res.json({
                message: "Não há registros com esse filtro"
            })

        }catch (error) {
            console.log(error)
        }
    },

    FiltroMensal: async (req, res) => {

        const {
            supervisor,
            nivel
        } = req.body;

        let where = {};
        if (supervisor) where.supervisor = supervisor;
        if (nivel) where.nivel = nivel;

        try {

            const pesquisaMes = await usuario_mes2.findAll({
                where
            });

            (pesquisaMes.length > 0 ) ? res.json({
                pesquisaMes,
            }): res.json({
                message: "Não há registros com esse filtro"
            })

        }catch (error) {
            console.log(error)
        }

    },

    Dia: async (req, res) => {
        const {
            supervisor,
            nivel
        } = req.body;

        let where = {};
        if (supervisor) where.supervisor = supervisor;
        if (nivel) where.nivel = nivel;

        try {

            console.time("Tempo de resposta da 3 consultas");

            //Setor
            const pesquisaDia = await usuario_dia2.findAll({
                where
            });

            console.timeEnd("Tempo de resposta da 3 consultas");

            return res.json({pesquisaDia: pesquisaDia});

        } catch (error) {
            console.log(error)
        }
    }

}
module.exports = TblUsuarioController;