const {
    propostas,
    vw_proposta,
    banco_origi,
    tipo,
    status,
    produto
} = require('../models');

const PropostaAguardandoController = {
    Banco: async (req, res) => {

        const bancos = await banco_origi.findAll({
            attributes: ['banco']
        });

        return res.json(bancos);

    },

    Tipo: async (req, res) => {

        const tipos = await tipo.findAll({
            attributes: ['tipo']
        });

        return res.json(tipos);
    },

    Status: async (req, res) => {

        const statuss = await status.findAll({
            attributes: ['status']
        });

        return res.json(statuss);
    },
    
    Produto: async (req, res) => {

        const produtos = await produto.findAll({
            attributes: ['produto']
        });

        return res.json(produtos);
    }
}

module.exports = PropostaAguardandoController;