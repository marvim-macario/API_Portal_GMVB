const Sequelize = require('sequelize');
const config = require('../config/database')
const db = new Sequelize(config);


const MotorController = {
     
   index: async(req,res) => {

    // const { element: {
    //         proposta,cpf,nome,data_cadastro,data_base,
    //         valor_solicitado,valor_refin,valor_liberado,prazo_contrato,
    //         mês,portabilidade,contrato,convenio,atividade,produto,tipo,
    //         regra,nome_promotor,cpf_promotor,siglae_corrigida,siglae,
    //         empresa,correntista,taxa,pontos_campanha,banco,taxa2
    // }} = req.body;

    const proposta ='931.264'
    const siglae_corrigida = 'E546893'

    const select1 =`SELECT base_parceiros.parceiro,base_parceiros.cnpj,parceiro2.parceiro,base_parceiros.supervisor_sant,base_parceiros.tipo,base_parceiros.data_admissao,base_parceiros.data_inativacao,base_parceiros.gerente_sant,base_parceiros.tipo_func FROM propostas,parceiro2,base_parceiros WHERE propostas.parceiro = parceiro2.parceiro and parceiro2.cpf = base_parceiros.cnpj and proposta = '${proposta}' and  base_parceiros.classificacao = '1' limit 1;`
    const select2 = `SELECT base_parceiros.parceiro,base_parceiros.cnpj,parceiro2.parceiro,base_parceiros.supervisor_sant,base_parceiros.tipo,base_parceiros.data_admissao,base_parceiros.data_inativacao,base_parceiros.gerente_sant,base_parceiros.tipo_func FROM proposta_mascara,parceiro2,base_parceiros WHERE proposta_mascara.parceiro = parceiro2.parceiro and parceiro2.cpf = base_parceiros.cnpj and proposta = '${proposta}' and  base_parceiros.classificacao = '1' limit 1;`
    const select3 = `SELECT base_parceiros.parceiro,base_parceiros.cnpj,base_parceiros.supervisor_sant,base_parceiros.tipo,base_parceiros.data_admissao,base_parceiros.data_inativacao,base_parceiros.gerente_sant,base_parceiros.tipo_func FROM siglae,base_parceiros where siglae.cpf_usuario1 = base_parceiros.cnpj and siglae.siglae = '${siglae_corrigida}' and  base_parceiros.classificacao = '1' limit 1;`

    const [consulta1] = await db.query(`SELECT proposta FROM propostas where proposta = '${proposta}'`)
  
    if(consulta1.length > 0){

        const [[result1]] = await db.query(select1)
        res.send(result1)

    }else{
        
        const [consulta2] = await db.query(`SELECT proposta FROM proposta_mascara where proposta = '${proposta}'`) 
        if(consulta2.length > 0){

            const [[result2]] = await db.query(select2)
            res.send(result2)    
        }else{
            
            const [consulta3] = await db.query(select3)       
            if(consulta3.length > 0){
                const [result3] = consulta3
                res.send(result3)

            }else{
                res.send('Proposta não identificada')
            }
        }


    }
   }
}

module.exports = MotorController;