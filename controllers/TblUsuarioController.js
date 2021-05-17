const {
    usuario_mes2,
    setor_usuario2,
    usuario_dia2
} = require('../models');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const TblUsuarioController = {

    Filtro: async (req, res) => {
        const {
            supervisor,
            nivel
        } = req.body

        let where = {};
        if (supervisor) where.supervisor = supervisor;
        if (nivel) where.nivel = nivel;

        try {

            //Setor
            const pesquisaSetor = await setor_usuario2.findAll({
                where
            });

            //Mes
            const pesquisaMes = await usuario_mes2.findAll({
                where
            });

            // Dia
            const pesquisaDia = await usuario_dia2.findAll({
                where: {
                    "01": ""
                }
            });

            (pesquisaSetor.length > 0 || pesquisaMes.length > 0 || pesquisaDia) ? res.json({
                pesquisaSetor,
                pesquisaMes,
                pesquisaDia
            }): res.json({
                message: "Não há registros com esse filtro"
            })

        } catch (error) {
            console.log(error)
        }
    }

}
module.exports = TblUsuarioController;