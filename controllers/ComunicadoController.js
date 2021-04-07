const {
    comunicado
} = require('../models');

const ComunicadoController = {
    Incluir: async (req, res) => {
        const dataAgora = () => {
            let date = new Date();
            let dateNow = `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            return dateNow;
        }


        const {
            titulo,
            obs
        } = req.body

        const result = await comunicado.create({
            titulo,
            obs,
            data_comunicado: dataAgora()
        })

        return res.status(200).json(result);
    },

    Anexo: async (req, res) => {
        let {
            url_img,
            url_img1,
            url_img2
        } = req.files;

        const {
            id_comunicado
        } = req.query;

        (url_img) ? url_img = req.files.url_img[0].originalname: url_img = null;
        (url_img1) ? url_img1 = req.files.url_img1[0].originalname: url_img1 = null;
        (url_img2) ? url_img2 = req.files.url_img2[0].originalname: url_img2 = null;

        try {
            const Comunicado = await comunicado.findOne({
                where: {
                    id_comunicado: id_comunicado
                }
            })

            if (Comunicado) {
                Comunicado.url_img = url_img
                Comunicado.url_img1 = url_img1
                Comunicado.url_img2 = url_img2

                Comunicado.save()
                return res.json(Comunicado)
            }

            return res.status(400).json({message: "ID n existe"})
        } catch (error) {
            console.log(error)
        }
    },

    Deletar: async (req, res) => {
        const id_comunicado = req.body.id_comunicado;

        const exists = await comunicado.findOne({
            where: {
                id_comunicado
            }
        })

        if(exists) {
            const ComunicadoExcluido = await comunicado.destroy({
                where: {
                    id_comunicado
                }
            })
            return res.status(200).json(ComunicadoExcluido);
        }

        return res.status(400).json({
            message: "Este Comunicado não existe"
        })

    }

}

module.exports = ComunicadoController;