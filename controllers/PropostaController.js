const { vw_proposta, status, tipo , empresa, banco, substatus, produto } = require('../models');


const PropostaController = {
        
        PropostaPorId: async(req, res) =>{
            const {id_acesso } = req.query;
            console.log(id_acesso);
        try {
            const proposta = await vw_proposta.findAll({
                attributes:{exclude:['id']},
                where:{
                     id_acesso
                },
                limit : 5,
                order: [
                    ['data_envio', 'DESC']
                ]

            });
            res.status(200).send(proposta)
            
        } catch (error) {
            res.status(500).send(error)
        }
    }

}
module.exports = PropostaController;