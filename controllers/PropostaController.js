const { vw_proposta, status, tipo , empresa, banco, substatus, produto, acesso_completo } = require('../models');


const PropostaController = {
    teste: async(req,res)=>{
        res.send('oi')
    },
   
    Interface: async(req,res)=>{
        
        const {  cnpj_matriz ,perfil, tipo_usuario} = req.body;

        if (tipo_usuario === 'PARCEIRO' ){

            if (perfil === 'MATRIZ'){

                const idsParceiros = await acesso_completo.findAll({
                    attributes:['id_acesso'],
                    where: {
                        cnpj_matriz
                    }
                });

                if(idsParceiros){
                    var parceiros = [];
                    idsParceiros.forEach(element => {
                        parceiros.push(element.id_acesso)
                        
                    });
                }

                const propstasMatriz = await vw_proposta.findAll({
                    where:{
                        id_acesso:parceiros
                    }
                })
                res.send(propstasMatriz)


            }
            if(perfil === 'SUBACESSO'){

                try {
                    
                    const parceiroSubAcesso =  await vw_proposta.findAll({

                        where:{
                            id_acesso
                        }
                    })
                    // if(parceiroSub)

                    return res.status(200).send(parceiroSubAcesso)
                    
                    
             } catch (error) {

                    return res.status(500).send(error)   
            }

            }
        }


        
    },







    //     PropostaPorId: async(req, res) =>{
    //         const {id_acesso } = req.query;
    //         console.log(id_acesso);
    //     try {
    //         const proposta = await vw_proposta.findAll({
    //             attributes:{exclude:['id']},
    //             where:{
    //                  id_acesso
    //             },
    //             limit : 5,
    //             order: [
    //                 ['data_envio', 'DESC']
    //             ]

    //         });
    //         res.status(200).send(proposta)
            
    //     } catch (error) {
    //         res.status(500).send(error)
    //     }
    // },

    

}
module.exports = PropostaController;