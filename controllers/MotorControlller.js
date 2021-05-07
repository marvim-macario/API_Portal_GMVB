const Sequelize = require('sequelize');
const config = require('../config/database')
const db = new Sequelize(config);


const MotorController = {
     
   index: async(req,res) => {

    var { element: {
            proposta,cpf,nome,data_cadastro,data_base,
            valor_solicitado,valor_refin,valor_liberado,prazo_contrato,
            mês,portabilidade,contrato,convenio,atividade,produto,tipo,
            regra,nome_promotor,cpf_promotor,siglae_corrigida,siglae,
            empresa,correntista,taxa,pontos_campanha,banco,taxa2
    }} = req.body;


    const select1 = `SELECT base_parceiros.parceiro,base_parceiros.cnpj, base_parceiros.comissao_novo as convenio_padrao,base_parceiros.comissao_inss as convenio_especial,base_parceiros.tabela_crefisa as crefisa,base_parceiros.tabela_multi as multibanco,base_parceiros.tabela_sim as sim,base_parceiros.ajuda_custo, base_parceiros.supervisor_sant,base_parceiros.tipo,base_parceiros.data_admissao,base_parceiros.data_inativacao,base_parceiros.gerente_sant,base_parceiros.tipo_func FROM base_parceiros inner join parceiro2 on parceiro2.cpf = base_parceiros.cnpj inner join propostas on propostas.parceiro = parceiro2.parceiro where propostas.proposta = '${proposta}' and base_parceiros.classificacao = '1' limit 1`
    const select2 = `SELECT base_parceiros.parceiro,base_parceiros.cnpj,base_parceiros.supervisor_sant,base_parceiros.tipo,base_parceiros.data_admissao,base_parceiros.data_inativacao,base_parceiros.gerente_sant,base_parceiros.tipo_func FROM proposta_mascara,parceiro2,base_parceiros WHERE proposta_mascara.parceiro = parceiro2.parceiro and parceiro2.cpf = base_parceiros.cnpj and proposta = '${proposta}' and  base_parceiros.classificacao = '1' limit 1;`
    const select3 = `SELECT base_parceiros.parceiro,base_parceiros.cnpj,base_parceiros.supervisor_sant,base_parceiros.tipo,base_parceiros.data_admissao,base_parceiros.data_inativacao,base_parceiros.gerente_sant,base_parceiros.tipo_func FROM siglae,base_parceiros where siglae.cpf_usuario1 = base_parceiros.cnpj and siglae.siglae = '${siglae_corrigida}' and  base_parceiros.classificacao = '1' limit 1;`
    const buscaConvenio = `select classificacao_convenio from tabela_comissao where convenio = '${convenio}'`

    const [consulta1] = await db.query(`SELECT proposta FROM propostas where proposta = '${proposta}'`)
  
    if(consulta1.length > 0){

        const [[result1]] = await db.query(select1);
        const[[conv]] = await db.query(buscaConvenio);
       
        if(!conv) var clas = {'classificacao':"Padrao"}
        else var clas = {'classificacao':conv.classificacao_convenio}
        

        regra = await regra.split("-")
        if(regra.length > 1)  regra = await regra[1]
          

        //   if(result1.tipo_func === 'PARCEIRO'){

            var [calc] = await db.query(`select * from tabela_comissao
                where convenio = '${convenio}'
                and correntista = '${correntista}'
                and tipo = '${tipo}'
                and banco = 'SANTANDER"'
                and regra = '${regra}'
                and data_vigencia like '%ATUAL%'
                limit 1;`
                )
          
            if(calc.length > 0){

                const rescal = calc;

            } else {
               
                if(clas.classificacao ===  'Tabela Pref Rio'){

                    [[rescal]] = await db.query(`select id_calculo,data_vigencia,parceiro  from tabela_comissao
                    where convenio = '${convenio}'
                    and data_vigencia like '%ATUAL%'
                    limit 1;`)  
                }

                // rescal = await db.query(
                //     ` select id_calculo,data_vigencia,parceiro  from tabela_comissao
                //     where convenio = '21071-CIA MUN DE LIMPEZA URBANA - COMLURB'
                //     and banco = 'SANTANDER'
                //     and regra = 'TODOS-COMLURB'
                //     and data_vigencia like '%ATUAL%'
                //     limit 1; `
                // )
               
        // }

             
        }
          console.log(rescal)
   
         
        res.send({  
        
            'inclusa':true,
            'proposta':proposta,
            'nome':result1.parceiro,
            'valor_liberado':valor_liberado,
            'prazo_contrato':prazo_contrato, 
            'convenio':convenio,
            'tipo':tipo,
            'regra':regra,
            'correntista':correntista,
            'classificacao':clas.classificacao ,

            'cnpj': result1.cnpj,
            'convenio_padrao':result1.convenio_padrao,
            'convenio_especial':result1.convenio_especial,
            'crefisa':result1.crefisa,
            'multibanco':result1.multibanco,
            'sim':result1.sim,
            'ajuda_custo':result1.ajuda_custo,
            'supervisor_sant':result1.supervisor_sant,
            'tipo':result1.tipo,
            'gerente_sant':result1.gerente_sant,
            'tipo_func':result1.tipo_func,
            'id_calculo':rescal.id_calculo,
            'data_vigencia':rescal.data_vigencia,
            'parceiro':rescal.parceiro

        })

    } else {
        
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
               res.send({'inclusa':false,'proposta':proposta,'message':'proposta, não identificada'})
            }
        }
    }
   }

   
}

module.exports = MotorController;