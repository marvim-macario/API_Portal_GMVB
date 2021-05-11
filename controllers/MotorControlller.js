const Sequelize = require('sequelize');
const config = require('../config/database')
const db = new Sequelize(config);


const MotorController = {
     
   index: async(req,res) => {

    var { element: { proposta,cpf,nome,data_cadastro,data_base,valor_solicitado,valor_refin,valor_liberado,prazo_contrato,mês,portabilidade,contrato,convenio,atividade,produto,tipo,regra,nome_promotor,cpf_promotor,siglae_corrigida,siglae,empresa,correntista,taxa,pontos_campanha,banco,taxa2 }} = req.body;
    // var {proposta,cpf,nome,data_cadastro,data_base,valor_solicitado,valor_refin,valor_liberado,prazo_contrato,mês,portabilidade,contrato,convenio,atividade,produto,tipo,regra,nome_promotor,cpf_promotor,siglae_corrigida,siglae,empresa,correntista,taxa,pontos_campanha,banco,taxa2 } = req.body;


    const select1 = `SELECT base_parceiros.parceiro,base_parceiros.cnpj, base_parceiros.comissao_novo as convenio_padrao,base_parceiros.comissao_inss as convenio_especial,base_parceiros.tabela_crefisa as crefisa,base_parceiros.tabela_multi as multibanco,base_parceiros.tabela_sim as sim,base_parceiros.ajuda_custo, base_parceiros.supervisor_sant,base_parceiros.tipo,base_parceiros.data_admissao,base_parceiros.data_inativacao,base_parceiros.gerente_sant,base_parceiros.tipo_func FROM base_parceiros inner join parceiro2 on parceiro2.cpf = base_parceiros.cnpj inner join propostas on propostas.parceiro = parceiro2.parceiro where propostas.proposta = '${proposta}' and base_parceiros.classificacao = '1' limit 1`
    const select2 = `SELECT base_parceiros.parceiro,base_parceiros.cnpj,base_parceiros.supervisor_sant,base_parceiros.tipo,base_parceiros.data_admissao,base_parceiros.data_inativacao,base_parceiros.gerente_sant,base_parceiros.tipo_func FROM proposta_mascara,parceiro2,base_parceiros WHERE proposta_mascara.parceiro = parceiro2.parceiro and parceiro2.cpf = base_parceiros.cnpj and proposta = '${proposta}' and  base_parceiros.classificacao = '1' limit 1;`
    const select3 = `SELECT base_parceiros.parceiro,base_parceiros.cnpj,base_parceiros.supervisor_sant,base_parceiros.tipo,base_parceiros.data_admissao,base_parceiros.data_inativacao,base_parceiros.gerente_sant,base_parceiros.tipo_func FROM siglae,base_parceiros where siglae.cpf_usuario1 = base_parceiros.cnpj and siglae.siglae = '${siglae_corrigida}' and  base_parceiros.classificacao = '1' limit 1;`
    const buscaConvenio = `select classificacao_convenio from tabela_comissao where convenio = '${convenio}'`

    const [consulta1] = await db.query(`SELECT proposta FROM propostas where proposta = '${proposta}'`)
  
    if(consulta1.length > 0){

        var [[dadosProposta]] = await db.query(select1)
        console.log(dadosProposta)

    } else {
        
        const [consulta2] = await db.query(`SELECT proposta FROM proposta_mascara where proposta = '${proposta}'`) 

        if(consulta2.length > 0){
          [[dadosProposta]] = await db.query(select2)
        }else{
         var consulta3 = await db.query(select3)   
        }    
            
        if(consulta3.length > 0) [dadosProposta] = consulta3
      
    }



    if(dadosProposta.length < 1) res.send({'inclusa':false,'proposta':proposta,'message':'proposta, não identificada'});
    else{
        const[[conv]] = await db.query(buscaConvenio);

        if(!conv) var clas = {'classificacao':"Padrao"}
        else var clas = {'classificacao':conv.classificacao_convenio}

        regra = await regra.split("-")
        if(regra.length > 1)  regra = await regra[1];

        var [calc] = await db.query(`select * from tabela_comissao where convenio = '${convenio}' and correntista = '${correntista}' and tipo = '${tipo}' and banco = 'SANTANDER' and regra = '${regra}' and data_vigencia like '%ATUAL%' limit 1;`)

        if(calc.length > 0) {
            var rescal = calc;
        } else {

            if(clas.classificacao ===  'Tabela Pref Rio'){
                [[rescal]] = await db.query(`select id_calculo,data_vigencia,parceiro  from tabela_comissao where convenio = '${convenio}' and data_vigencia like '%ATUAL%' limit 1;`)  
            }
        }

        if(dadosProposta.tipo_func !== 'PARCEIRO') var pct_parceiro = null;
        else var pct_parceiro = rescal.parceiro

        var calculado;

        if(clas === 'Convenios Taxa'){
         calculado = await db.query(`select ROUND((${valor_liberado} * ${pct_parceiro} * comissao_especial1 / 100 ),2)  from dual;`)
        } else if(clas === 'Gov Minas' ){
            calculado = await db.query(`select ROUND((${valor_liberado} * ${tabela_parceiro} * comissao_minas1 / 100 ),2) from dual;`)
        }
    
//  res.send({  
//         'inclusa':true,
//         'proposta':proposta,
//         'nome':dadosProposta.parceiro,
//         'valor_liberado':valor_liberado,
//         'prazo_contrato':prazo_contrato, 
//         'convenio':convenio,
//         'tipo':tipo,
//         'regra':regra,
//         'correntista':correntista,
//         'classificacao':clas.classificacao ,
//         'cnpj': dadosProposta.cnpj,
//         'convenio_padrao':dadosProposta.convenio_padrao,
//         'convenio_especial':dadosProposta.convenio_especial,
//         'crefisa':dadosProposta.crefisa,
//         'multibanco':dadosProposta.multibanco,
//         'sim':dadosProposta.sim,
//         'ajuda_custo':dadosProposta.ajuda_custo,
//         'supervisor_sant':dadosProposta.supervisor_sant,
//         'tipo':dadosProposta.tipo,
//         'gerente_sant':dadosProposta.gerente_sant,
//         'tipo_func':dadosProposta.tipo_func,
//         'id_calculo':rescal.id_calculo,
//         'data_vigencia':rescal.data_vigencia,
//         'parceiro':pct_parceiro

//     })
    }


  }
}

   


module.exports = MotorController;