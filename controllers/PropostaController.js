const { vw_proposta, status, tipo , empresa, banco, substatus, produto } = require('../models');


const PropostaController = {

    PropostaPorId: async(req, res) =>{

        try {
            const proposta = await vw_proposta.findAll({
                attributes:{exclude:['id']},
                where:{
                     id_acesso:'2'
                }
            })
            res.status(200).send(proposta)
            
        } catch (error) {
            res.status(500).send(error)
        }
    },

    Status: async (req, res) => {

        const statusPropostas = await status.findAll({
            attributes: ['status']
        })

        res.send(statusPropostas)
    },

    Tipo: async (req, res) => {
        try {
            const TipoPropostas = await tipo.findAll({

                attributes: ['tipo']
            })

            res.send(TipoPropostas)

        } catch (error) {
            res.send(error)
        }
    },

    Empresa: async (req,res) => {
        try {
            const Empresa = await empresa.findAll({
                attributes: ['empresa']
            })
            res.send(Empresa)

        } catch (error) {

            res.send(error)
        }
    },

    Banco: async(req, res) => {
        try {
            const bancos = await banco.findAll({})
            res.send(bancos)
        } catch (error) {
            res.send(error)
        }
    },

    SubStatus: async (req, res) => {

        // console.log(req)
        try {
            const sub = await substatus.findAll({
                // attributes:['sub_status']
                
            })
            res.send(sub);
        } catch (error) {
            res.send(error)
        }
    },
    
    Produto: async (req, res) => {

        try {
            const prod = await produto.findAll({})
            res.send(prod)
        } catch (error) {
            res.send(error)
        }
    }



}
module.exports = PropostaController;