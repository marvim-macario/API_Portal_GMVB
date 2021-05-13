const Sequelize = require('sequelize');
const config = require('../config/database')
const db = new Sequelize(config);
const BuscaProposta = require('../modules/motor')


const MotorController = {

    index: async (req, res) => {

        var { element: { proposta,cpf,nome,data_cadastro,data_base, valor_solicitado,valor_refin,valor_liberado,prazo_contrato, mês,portabilidade,contrato,convenio,atividade,produto,tipo,
                regra,nome_promotor,cpf_promotor,siglae_corrigida,siglae,
                empresa,correntista,taxa,pontos_campanha,banco,taxa2
        }} = req.body;
    //     var {  proposta,cpf,nome,data_cadastro,data_base, valor_solicitado,valor_refin,valor_liberado,prazo_contrato, mês,portabilidade,contrato,convenio,atividade,produto,tipo,
    //         regra,nome_promotor,cpf_promotor,siglae_corrigida,siglae,
    //         empresa,correntista,taxa,pontos_campanha,banco,taxa2
    // } = req.body;

        
        const select1 = `SELECT base_parceiros.parceiro,base_parceiros.cnpj, base_parceiros.comissao_novo as convenio_padrao,base_parceiros.comissao_inss as convenio_especial,base_parceiros.tabela_crefisa as crefisa,base_parceiros.tabela_multi as multibanco,base_parceiros.tabela_sim as sim,base_parceiros.ajuda_custo, base_parceiros.supervisor_sant,base_parceiros.tipo,base_parceiros.data_admissao,base_parceiros.data_inativacao,base_parceiros.gerente_sant,base_parceiros.tipo_func FROM base_parceiros inner join parceiro2 on parceiro2.cpf = base_parceiros.cnpj inner join propostas on propostas.parceiro = parceiro2.parceiro where propostas.proposta = '${proposta}' and base_parceiros.classificacao = '1' limit 1`
        const select2 = `SELECT base_parceiros.parceiro,base_parceiros.cnpj,base_parceiros.supervisor_sant,base_parceiros.tipo,base_parceiros.data_admissao,base_parceiros.data_inativacao,base_parceiros.gerente_sant,base_parceiros.tipo_func FROM proposta_mascara,parceiro2,base_parceiros WHERE proposta_mascara.parceiro = parceiro2.parceiro and parceiro2.cpf = base_parceiros.cnpj and proposta = '${proposta}' and  base_parceiros.classificacao = '1' limit 1;`
        const buscaConvenio = `select classificacao_convenio from tabela_comissao where convenio = '${convenio}' limit 1`
        var sql;

        const [fields, rows] = await db.query(`SELECT proposta FROM propostas where proposta = '${proposta}'`)
        if (rows.length) {
            console.log('encontrado proposta')

            sql = select1
        } else {
            const [fields2, rows2] = await db.query(`SELECT proposta FROM proposta_mascara where proposta = '${proposta}'`)
            if (rows2.length) {
                console.log('encontrado proposta mascara')
                sql = select2
            } else {
                const [fields3, rows3] = await db.query(`SELECT siglae FROM siglae where siglae = '${siglae_corrigida}'`)
                if (rows3.length) {
                    console.log('encontrado siglae')
                    sql = select3
                } else {

                    res.send('Proposta não identificada')
                }
            }
        }
        
        //identificacao de proposta

        var [[dadosIdenticacao]] = await db.query(sql);
        console.log(dadosIdenticacao)
        //busca convenios
        const [conv] = await db.query(buscaConvenio);
       
        //classificacao
        var classificacao;
        if(conv.length === 1){
            classificacao = conv[0].classificacao_convenio;
        } else {
             classificacao = 'PADRAO';
        }
            
        // altera formatação da regra
        regra = await regra.split("-")
        if(regra.length > 1)  regra = await regra[1];


        var rescal;
        var [calc] = await db.query(`select * from tabela_comissao where convenio = '${convenio}' and correntista = '${correntista}' and tipo = '${tipo}' and banco = 'SANTANDER' and regra = '${regra}' and data_vigencia like '%ATUAL%' limit 1;`)
         
        if(!calc.length){
            if(classificacao ==="Tabela Pref Rio"){
                [[rescal]] = await db.query(`select id_calculo,data_vigencia,parceiro  from tabela_comissao where convenio = '${convenio}' and data_vigencia like '%ATUAL%' limit 1;`)  
                console.log(rescal)
            }else{
                [[rescal]] = await db.query(` select id_calculo,data_vigencia,parceiro from tabela_comissao
                                            where convenio = '${convenio}'
                                            and banco = 'SANTANDER'
                                          
                                            and data_vigencia like '%ATUAL%'
                                            limit 1;`)   // and regra = '${regra}'
            }
        }else{
            rescal = calc;
        }
        if(!rescal) rescal = 'calculo não encontrado'
        if(dadosIdenticacao.tipo_func !== 'PARCEIRO') var pct_parceiro = null;
        else var pct_parceiro = rescal.parceiro

        let calculado;
        if(dadosIdenticacao.tipo_func === 'PARCEIRO'){
     
            switch(calculado) {
                case ('Convenios Taxa'):
                    calculado = (valor_liberado * pct_parceiro * dadosIdenticacao.convenio_especial / 100 ),2
                    break;
                case ('Gov Minas'):
                    calculado = (valor_liberado1 * tabela_parceiro1 * comissao_minas1 / 100 ),2
                break;
                case (''):
                break;
                case ('Convenios Taxa'):
                    calculado = (valor_liberado * pct_parceiro * dadosIdenticacao.convenio_especial / 100 ),2
                    break;
                case (''):
                    break;
                default:
                // code block
            }
        }
        
         res.send({  
        'inclusa':true,
        'proposta':proposta,
        'nome':dadosIdenticacao.parceiro,
        'valor_liberado':valor_liberado,
        'prazo_contrato':prazo_contrato, 
        'convenio':convenio,
        'tipo':tipo,
        'regra':regra,
        'correntista':correntista,
        'classificacao':classificacao ,
        'dadosIdenticacao':dadosIdenticacao,
        'calculo':rescal,
        'calculado':calculado
        
        // 'cnpj': dadosIdenticacao.cnpj,
        // 'convenio_padrao':dadosIdenticacao.convenio_padrao,
        // 'convenio_especial':dadosIdenticacao.convenio_especial,
        // 'crefisa':dadosIdenticacao.crefisa,
        // 'multibanco':dadosIdenticacao.multibanco,
        // 'sim':dadosIdenticacao.sim,
        // 'ajuda_custo':dadosIdenticacao.ajuda_custo,
        // 'supervisor_sant':dadosIdenticacao.supervisor_sant,
        // 'tipo':dadosIdenticacao.tipo,
        // 'gerente_sant':dadosIdenticacao.gerente_sant,
        // 'tipo_func':dadosIdenticacao.tipo_func,
        // 'id_calculo':rescal.id_calculo,
        // 'data_vigencia':rescal.data_vigencia,
        // 'parceiro':pct_parceiro

    })

    }
}

module.exports = MotorController;