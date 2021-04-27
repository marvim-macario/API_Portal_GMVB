const models = require('../models');


const propostas = models.propostas;

const MotorController = {
     
   create: async(req,res) => {

    // const { element: {
    //         proposta,cpf,nome,data_cadastro,data_base,
    //         valor_solicitado,valor_refin,valor_liberado,prazo_contrato,
    //         mês,portabilidade,contrato,convenio,atividade,produto,tipo,
    //         regra,nome_promotor,cpf_promotor,siglae_corrigida,siglae,
    //         empresa,correntista,taxa,pontos_campanha,banco,taxa2
    // }} = req.body;

    const proposta ='1282083'

    const consulta = await propostas.findAll({

        where:{
            proposta: proposta,
            
        }, include:'parceiro2',
        attributes:['proposta']
      
    });

    res.send(consulta)
    // console.table(consulta)
    // res.send(propostas)

    // if(consulta){

    // }

    // var consulta2 = proposta_mascara.findOne({

    //         where:{
    //             proposta:proposta
    //         },
    //         attributes:['proposta']
          
    //     });

    // if(consulta2){

    //     const select2 = await MASCARA_MOTOR.findOne({

    //         where: {
    //             proposta: proposta
    //         },
    //         attributes: { exclude: ['id'] }
    //     })

    //     res.send(select2)
    // }


    // var select3 = await SIGLAS_MOTOR.findOne({

    //     where:{
    //         siglae: siglae_corrigida
    //     },
    //     attributes: { exclude: ['id','proposta'] }
    // })
    
    // if(select3){
    //     res.send(select3)
    // }

    
    
    // res.send('proposta não identifi')

   }

   
}

module.exports = MotorController;