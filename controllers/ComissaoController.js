const {proposta_comissao } = require('../models/');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const excelToJson = require('convert-excel-to-json');
const fs = require('fs')




const ComissaoController = {
    Pesquisar: async(req, res)=>{
        const { banco } = req.query;
        const{
            userPerfil,
            userCpf,
            userTipousuario,
            userNome,
            userCnpjMatriz,
            parceiro,     
            proposta,       
            supervisor,        
            status,         
            gerente, 
            data_sup,  
            data_ger,         
            competencia,
            cpf          
        } =req.body
       
        var where = { banco };
            if(parceiro) where.parceiro = {[Op.substring]: parceiro};           
            if(proposta) where.proposta = proposta;        
            if(supervisor) where.supervisor =supervisor;              
            if(status) where.status = status;
            if(gerente) where.gerente = gerente;
            if(data_sup) where.data_sup = data_sup
            if(data_ger) where.data_ger = data_ger          
            if(competencia) where.competencia = competencia
            if(cpf) where.cpf = cpf;
            if(userTipousuario ==='PARCEIRO'&& userPerfil==='MATRIZ' ) where.cnpj = userCnpjMatriz
            if(userTipousuario ==='PARCEIRO'&& userPerfil==='SUB ACESSO') where.cpf = userCpf
            if(userTipousuario ==='SUPERVISOR') where.supervisor = userNome;
            if(userTipousuario ==='GERENTE') where.gerente = userNome;
        
            
    try {
            
      
        const pesquisaCount = await proposta_comissao.findAndCountAll({
               
                where
        })
        
        const soma = await proposta_comissao.sum('calculo',{
            where
        })

        res.status(200).json({'soma':soma,'count':pesquisaCount.count,'dados':pesquisaCount.rows})

    } catch (error) {
            console.log(error)
    }
    },

    PreecherModal: async(req, res) =>{
        const { proposta } = req.body
        const retornoProposta = await proposta_comissao.findOne({
            where:{
                proposta
            }
        })

        res.status(200).send(retornoProposta);
    },

    Incluir: async (req, res) =>{
        
        let propostasIncluidas = [];
        let propostasNaoIncluidas =[];
        
        const result = excelToJson({
            source: fs.readFileSync('./tmp/excel/incluir_propostas.xlsx'),
            header:{
                rows: 1 
            },
            columnToKey: {
            A: 'proposta',
            B: 'parceiro',
            C: 'cnpj',
            D: 'supervisor',
            E: 'valor_liberado',
            F: 'tipo',
            G: 'convenio',
            H: 'comissao_inss',
            I: 'comissao_port',
            J: 'comissao_novo',
            K: 'status',
            L: 'calculo',
            M: 'status_pagamento',
            N: 'data_pagamento',
            O: 'movimentacao',
            P: 'data_liberacao',
            Q: 'status_calculo',
            R: 'contrato',
            S: 'conversor',
            T: 'data_inclusao',
            U: 'receita_liquida',
            V: 'cpf_sup',
            W: 'cpf_ger',
            X: 'gerente',
            Y: 'cpf_quat',
            Z: 'quaternario',
            AA: 'valor_sup',
            AB: 'valor_ger',
            AC: 'valor_quat',
            AD: 'pct_sup',
            AE: 'pct_ger',
            AF: 'pct_quat',
            AG: 'cpf',
            AH: 'nome',
            AI: 'data_proposta',
            AJ: 'parceiro_esteira',
            AK: 'produto',
            AL: 'regra',
            AM: 'tipo_func',
            AN: 'siglae_corrigida',
            AO: 'valor_solicitado',
            AP: 'valor_refin',
            AQ: 'data_cadastro',
            AR: 'data_base',
            AS: 'mes',
            AT: 'data_sup',
            AU: 'data_ger',
            AV: 'data_quat',
            AW: 'projeto',
            AX: 'Correntista',
            AY: 'Prazo',
            AZ: 'Coluna3',
            BA: 'Coluna4',
            BB: 'Coluna5',
            BC: 'Coluna6',
            BD: 'Coluna7',
            BE: 'Coluna8',
            BF: 'Coluna9',
            BG: 'Coluna10',
            BH: 'Coluna11',
            BI: 'Coluna12',
            BJ: 'Coluna13',
            BK: 'Coluna14',
            BL: 'Coluna15',
            BM: 'Coluna16',
            BN: 'Coluna17',
            BO: 'Coluna18',
            BP: 'Coluna19'
            }
           
        });

        const propostas = result.Planilha1;
        for (const proposta of propostas) {
  
            const buscaProposta = await proposta_comissao.findOne({
                where:{
                    proposta:proposta.proposta
                }
            })

            if(buscaProposta){
                propostasNaoIncluidas.push({'proposta':proposta.proposta,'erro':'proposta já existe na base de dados'})
            }else{
                const propostaCreate = await proposta_comissao.create(
                    proposta
                )
                if(propostaCreate) propostasIncluidas.push({'proposta':propostaCreate.proposta})
            }
        }
        fs.unlink('./tmp/excel/incluir_propostas.xlsx', function (err){
            if (err) throw err;
            console.log('Arquivo deletado!');
        })
        res.status(200).send({propostasIncluidas,propostasNaoIncluidas,})
    }, 

    Alterar: async( req,res ) => {
        let propostasAlteradas = [];
        let propostasNaoAlteradas =[];
        
        const result = excelToJson({
            source: fs.readFileSync('./tmp/excel/alterar_propostas.xlsx'),
            header:{
                rows: 1 
            },
            columnToKey: {
                A:'proposta',
                B: 'status_pagamento',
                C: 'calculo',
                D: 'movimentacao',
                E: 'data_pagamento',
                F: 'valor_sup',
                G: 'data_sup',
                H: 'valor_ger',
                I: 'data_ger',
                J: 'cnpj',
                K: 'parceiro',
                L: 'supervisor',
                M: 'gerente',
                N: 'quaternario'
            }
        })
        const propostas = result.Planilha1;
        for (const proposta of propostas) {
  
            const buscaProposta = await proposta_comissao.findOne({
                where:{
                    proposta:proposta.proposta
                }
            })
            if(!buscaProposta) propostasNaoAlteradas.push({'proposta':proposta.proposta,'erro':'propostanão encotrada'})
            if(buscaProposta){
                if(buscaProposta.status_pagamento === 'PAGO' && buscaProposta.valor_liberado > 0){
                    propostasNaoAlteradas.push({'proposta':proposta.proposta,'erro':'proposta paga ou valor maior que 0 '})
                }else{

                    if(proposta.proposta !=null) buscaProposta.proposta = proposta.proposta;
                    if(proposta.status_pagamento !=null) buscaProposta.status_pagamento = proposta.status_pagamento
                    if(proposta.calculo !=null) buscaProposta.calculo = proposta.calculo
                    if(proposta.movimentacao !=null)buscaProposta.movimentacao = proposta.movimentacao
                    if(proposta.data_pagamento !=null)buscaProposta.data_pagamento = proposta.data_pagamento
                    if(proposta.valor_sup !=null)buscaProposta.valor_sup = proposta.valor_sup
                    if(proposta.data_sup !=null)buscaProposta.data_sup = proposta.data_sup 
                    if(proposta.valor_ger !=null)buscaProposta.valor_ger = proposta.valor_ger
                    if(proposta.data_ger !=null)buscaProposta.data_ger = proposta.data_ger 
                    if(proposta.cnpj !=null)buscaProposta.cnpj = proposta.cnpj
                    if(proposta.parceiro !=null)buscaProposta.parceiro = proposta.parceiro 
                    if(proposta.supervisor !=null)buscaProposta.supervisor = proposta.supervisor
                    if(proposta.gerente !=null)buscaProposta.gerente = proposta.gerente
                    if(proposta.quaternario !=null)buscaProposta.quaternario = proposta.quaternario
                    buscaProposta.save()
                    propostasAlteradas.push({'proposta':proposta.proposta})
                }

            }
            
        } 
        fs.unlink('./tmp/excel/alterar_propostas.xlsx', function (err){
            if (err) throw err;
            console.log('Arquivo deletado!');
        })
        res.status(200).json({propostasAlteradas,propostasNaoAlteradas})
    }
}


module.exports = ComissaoController;
