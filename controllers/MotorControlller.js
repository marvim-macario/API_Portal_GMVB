const Sequelize = require('sequelize');
const config = require('../config/database')
const db = new Sequelize(config);

const buscaCalculo = (comissao, rescal)=>{

    console.log(comissao)
    // comissao = comissao.split(" ")[1].toLowerCase(); 
    // comissao = 'tab_'+comissao
    // for (const [key, value] of Object.entries(rescal[0])) {
    //     if(key === comissao){
    //         comissao =  value;
    //     }
    // }
    // return comissao
}

const MotorController = {
     
   BuscaPropostas: async(req,res) => {

    let { element: { proposta,cpf,nome,data_cadastro,data_base,valor_solicitado,valor_refin,valor_liberado,prazo_contrato,mês,portabilidade,contrato,convenio,atividade,produto,tipo,regra,nome_promotor,cpf_promotor,siglae_corrigida,siglae,empresa,correntista,taxa,pontos_campanha,banco,taxa2 }} = req.body;
    var result;

    if(siglae_corrigida === '-')siglae_corrigida = null;
    const select1 = `SELECT base_parceiros.parceiro,base_parceiros.cnpj, base_parceiros.comissao_novo as convenio_padrao,base_parceiros.comissao_inss as convenio_especial,base_parceiros.tabela_crefisa as crefisa,base_parceiros.tabela_multi as multibanco,base_parceiros.tabela_sim as sim,base_parceiros.prefeitura_rio as prefeitura_rio,base_parceiros.governo_minas, base_parceiros.ajuda_custo, base_parceiros.supervisor_sant,base_parceiros.tipo,base_parceiros.data_admissao,base_parceiros.data_inativacao,base_parceiros.gerente_sant,base_parceiros.tipo_func FROM base_parceiros inner join parceiro2 on parceiro2.cpf = base_parceiros.cnpj inner join propostas on propostas.parceiro = parceiro2.parceiro where propostas.proposta = '${proposta}' and base_parceiros.classificacao = '1' limit 1`
    const select2 = `SELECT base_parceiros.parceiro,base_parceiros.cnpj,base_parceiros.supervisor_sant,base_parceiros.tipo,base_parceiros.data_admissao,base_parceiros.data_inativacao,base_parceiros.gerente_sant,base_parceiros.tipo_func FROM proposta_mascara,parceiro2,base_parceiros WHERE proposta_mascara.parceiro = parceiro2.parceiro and parceiro2.cpf = base_parceiros.cnpj and proposta = '${proposta}' and  base_parceiros.classificacao = '1' limit 1;`
    const select3 = `SELECT base_parceiros.parceiro,base_parceiros.cnpj,base_parceiros.supervisor_sant,base_parceiros.tipo,base_parceiros.data_admissao,base_parceiros.data_inativacao,base_parceiros.gerente_sant,base_parceiros.tipo_func FROM siglae,base_parceiros where siglae.cpf_usuario1 = base_parceiros.cnpj and siglae.siglae = '${siglae_corrigida}' and  base_parceiros.classificacao = '1' limit 1;`
    const buscaConvenio = `select classificacao_convenio from tabela_comissao where convenio = '${convenio}'`
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
            } 
        }
    }
    
    if(sql){
        res.send({'encontrada':true,proposta,cpf,nome,data_cadastro,data_base,valor_solicitado,valor_refin,valor_liberado,prazo_contrato,mês,portabilidade,contrato,convenio,atividade,produto,tipo,regra,nome_promotor,cpf_promotor,siglae_corrigida,siglae,empresa,correntista,taxa,pontos_campanha,banco,taxa2,sql})
    }else{
        res.send({'encontrada':false,proposta,cpf,nome,data_cadastro,data_base,valor_solicitado,valor_refin,valor_liberado,prazo_contrato,mês,portabilidade,contrato,convenio,atividade,produto,tipo,regra,nome_promotor,cpf_promotor,siglae_corrigida,siglae,empresa,correntista,taxa,pontos_campanha,banco,taxa2})
    }

    },

    Identifica: async (req, res) => {

        const { element: {data: { proposta,cpf,nome,data_cadastro,data_base,valor_solicitado,valor_refin,valor_liberado,prazo_contrato,mês,portabilidade,contrato,convenio,atividade,produto,tipo,regra,nome_promotor,cpf_promotor,siglae_corrigida,siglae,empresa,correntista,taxa,pontos_campanha,banco,taxa2,sql }}} = req.body;
        
        
        const [[dadosIdenticacao]] = await db.query(sql);
        res.send({proposta,cpf,nome,data_cadastro,data_base,valor_solicitado,valor_refin,valor_liberado,prazo_contrato,mês,portabilidade,contrato,convenio,atividade,produto,tipo,regra,nome_promotor,cpf_promotor,siglae_corrigida,siglae,empresa,correntista,taxa,pontos_campanha,banco,taxa2,dadosIdenticacao})
    },

    Convenio: async (req, res) =>{
 
        const { element:{proposta,cpf,nome,data_cadastro,data_base,valor_solicitado,valor_refin,valor_liberado,prazo_contrato,mês,portabilidade,contrato,convenio,atividade,produto,tipo,regra,nome_promotor,cpf_promotor,siglae_corrigida,siglae,empresa,correntista,taxa,pontos_campanha,banco,taxa2,dadosIdenticacao}} = req.body;
        let [[classificacao]] = await db.query(`select classificacao_convenio from tabela_comissao where convenio = '${convenio} ' limit 1`);
       
        if(!classificacao) classificacao = 'PADRAO'
        else classificacao = classificacao.classificacao_convenio;
        
        res.send({proposta,cpf,nome,data_cadastro,data_base,valor_solicitado,valor_refin,valor_liberado,prazo_contrato,mês,portabilidade,contrato,convenio,atividade,produto,tipo,regra,nome_promotor,cpf_promotor,siglae_corrigida,siglae,empresa,correntista,taxa,pontos_campanha,banco,taxa2,classificacao,dadosIdenticacao})
        
    },

    BuscaCalculo: async (req, res) => {
        const {element} = req.body;
        
        const {dadosIdenticacao} = element;
        
        element.regra = await element.regra.split("-")
        if(element.regra.length > 1)  element.regra = await element.regra[1];
        element.regra = element.regra.trim(" ");
        

        var [tabelaCalculo] = await db.query(`select * from tabela_comissao where convenio = '${element.convenio}' and correntista = '${element.correntista}' and tipo = '${element.tipo}' and banco = 'SANTANDER' and regra = '${element.regra}' and data_vigencia like '%ATUAL%' limit 1;`)
        if(!tabelaCalculo.length){
            if(element.classificacao ==="Tabela Pref Rio"){
                [tabelaCalculo] = await db.query(`select * from tabela_comissao where convenio = '${element.convenio}' and data_vigencia like '%ATUAL%' limit 1;`)  
            }else{
                [tabelaCalculo] = await db.query(`select * from tabela_comissao
                                    where convenio = '${element.convenio}'
                                    and banco = 'SANTANDER'
                                    and regra = '${element.regra}'
                                    and data_vigencia like '%ATUAL%'
                                    limit 1;`)  
            }
        }

        if(!tabelaCalculo.length) tabelaCalculo = 'calculo nao encontrado';
        
        
        res.send({element,tabelaCalculo})

    },

    CalculoParceiro: async (req, res) => {
            const {element} =req.body;
            const dadosProposta = element.element;
            const {dadosIdenticacao} = dadosProposta;
            const {tabelaCalculo} = element;
        
          
            var calculado;
            switch(dadosProposta.classificacao) {
                case ('Convenios Taxa'):
                    var comissao = dadosIdenticacao.convenio_especial;
                   
                    // if(typeof comissao === 'string') {   
                    //     const x = buscaCalculo(comissao, tabelaCalculo)
                    //     calculado = (valor_liberado * x )
                    // }else{
                        calculado = (dadosProposta.valor_liberado * tabelaCalculo[0].parceiro * comissao / 100 )
                      
                    // }
                   
                    break;
                case ('Gov Minas'):
                    calculado = (dadosProposta.valor_liberado * tabelaCalculo[0].parceiro * dadosIdenticacao.governo_minas / 100 ),2
                break;
                case ('Tabela Pref Rio'):
                   calculado = (dadosProposta.valor_liberado * tabelaCalculo[0].parceiro * dadosIdenticacao.prefeitura_rio / 100 ),2
                break;
                case ('Multi Bancos'):
                    calculado = (dadosProposta.valor_liberado * tabelaCalculo[0].parceiro * dadosIdenticacao.multibanco / 100 ),2
                    break;
                default:
                    switch(element.tipo) {
                        case('PORTABILIDADE'):                  
                            calculado = (dadosProposta.valor_liberado * dadosIdenticacao.convenio_padrao * 0.016 / 100),2
                            break;
                        case('PORTABILIDADE COMPETITIVA'):
                            calculado = (dadosProposta.valor_liberado * dadosIdenticacao.convenio_padrao * 0.016 / 100 / 2),2
                            break;
                        case('NOVO COMP'):
                            calculado = (valor_liberado * dadosIdenticacao.convenio_padrao * 0.0408 / 100 / 2),2
                            break;
                        default:
                            calculado = (valor_liberado * dadosIdenticacao.convenio_padrao * 0.0408 / 100),2
                    }
                }
                calculado = calculado.toFixed(2)
                res.send({element,calculado})
    },

    CalculoMei: async (req, res) => {
        const {element } = req.body;
        

        //
    }
}

module.exports = MotorController;