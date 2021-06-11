const {
    producao
} = require("../models");

const Sequelize = require("sequelize");

const ProducaoController = {
    ProducaoAtual: async (req, res) => {
        const supervisor = req.body.supervisor;

        const resultFind = await producao.findOne({
            where: {
                data_cadastro: new Date().toLocaleDateString(),
                supervisor
            }
        });



        return res.json(resultFind);
    },



    Update: async (req, res) => {

        const objFileds = new Object({
            ...req.body
        });

        for (const [key, value] of Object.entries(objFileds)) {
            if (value === null || value === undefined) {
                delete objFileds[key];
            }
        }

        const result = await producao.findOne({
            where: {
                id_producao: req.query.codigo
            }
        });

        result.digitado_novo = objFileds.digitado_novo
        result.digitado_port = objFileds.digitado_port
        result.digitado_prev = objFileds.digitado_prev
        result.integrado_novo = objFileds.integrado_novo
        result.integrado_port = objFileds.integrado_port
        result.integrado_prev = objFileds.integrado_prev
        result.ole_valor = objFileds.ole_valor
        result.ole_qtd = objFileds.ole_qtd
        result.tipo = 1
        result.integrado_bb = objFileds.integrado_bb
        result.digitado_bb = objFileds.digitado_bb

        result.save();

        return res.json(result);
    },

    Lista: async (req, res) => {
        const {
            supervisor
        } = req.body;

        let where = {};
        if (supervisor) where.supervisor = supervisor;

        const Producao = await producao.findAll({
            where,
            order: [
                [Sequelize.fn('str_to_date', Sequelize.col('data_cadastro'), '%d/%m/%Y'), 'desc']
            ],
            limit: 50
        })
        res.status(200).json(Producao);
    },

    Alterar: async (req, res) => {
        const {
            id_producao,
            promotor,
            digitado_novo,
            digitado_port,
            digitado_prev,
            integrado_novo,
            integrado_port,
            integrado_prev,
            ole_valor,
            ole_qtd,
            supervisor,
            data_cadastro,
            tipo,
            integrado_bb,
            digitado_bb,
            flag,
            mes
        } = req.body;

        try {

            const AlterarProducao = await producao.findOne({
                where: {
                    id_producao
                }
            })

            if (!AlterarProducao) {
                return res.send("Producao inexistente")
            }

            AlterarProducao.promotor = promotor
            AlterarProducao.digitado_novo = digitado_novo
            AlterarProducao.digitado_port = digitado_port
            AlterarProducao.digitado_prev = digitado_prev
            AlterarProducao.integrado_novo = integrado_novo
            AlterarProducao.integrado_port = integrado_port
            AlterarProducao.integrado_prev = integrado_prev
            AlterarProducao.ole_valor = ole_valor
            AlterarProducao.ole_qtd = ole_qtd
            AlterarProducao.supervisor = supervisor
            AlterarProducao.data_cadastro = data_cadastro
            AlterarProducao.tipo = tipo
            AlterarProducao.integrado_bb = integrado_bb
            AlterarProducao.digitado_bb = digitado_bb
            AlterarProducao.flag = flag
            AlterarProducao.mes = mes
            AlterarProducao.save()
            return res.status(200).json(AlterarProducao)

        } catch (error) {
            console.log(error)
        }
    },

    Modal: async (req, res) => {
        try {
            const {
                id_producao
            } = req.body;

            const dadosProducao = await producao.findOne({
                where: {
                    id_producao
                }
            })
            return res.status(200).send(dadosProducao)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = ProducaoController;