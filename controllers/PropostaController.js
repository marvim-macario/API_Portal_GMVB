const { vw_proposta, acesso_completo,propostas } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

// const multer = require('multer'); 


const PropostaController = {
    

    Interface: async(req,res)=>{
        
        const { id_aceso, cnpj_matriz ,perfil, tipo_usuario, nome,
        
            parceiro,
            tipo_parceiro,
            proposta,
            status,
            tipo,
            cpf,
            empresa,
            mes,
            previsao_retorno,
            novo_proposta,
            banco,
            data_envio,
            data_atualizacao,
            correntista,
            sub_status,
            classificacao,
            situacao,
            master,
            tipo_fase,
            banco_origi,
            produto,
            usuario_master,
            supervisor,
            sms,
            gerente,
            tipo_parceiro2,
            data_corte,
            empresa_sms,
            convenio,
            data_vinculo,
            horario,
            validade_contrato,
            etapa_sms,
            tipo_banco

        } = req.body;

        var where = {};

        if(parceiro) where.parceiro = {[Op.substring]: parceiro}
        if(tipo_parceiro) where.tipo_parceiro = tipo_parceiro;
        if(proposta) where.proposta = proposta;
        if(status) where.status = status;
        if(tipo) where.tipo = tipo;
        if(cpf) where.cpf = cpf;
        if(empresa) where.empresa = empresa;
        if(mes) where.mes = mes;
        if(previsao_retorno) where.previsao_retorno = previsao_retorno;
        if(novo_proposta) where.novo_proposta = novo_proposta;
        if(banco) where.banco = banco
        if(data_atualizacao) where.data_atualizacao = data_atualizacao;
        if(sub_status) where.sub_status = sub_status;
        if(classificacao) where.classificacao = classificacao;
        if(situacao) where.situacao = situacao;
        if(master) where.master = master;
        if(tipo_fase) where.tipo_fase = tipo_fase;
        if(banco_origi) where.banco_origi = banco_origi;
        if(produto) where.produto = produto;
        if(classificacao) where.classificacao = classificacao;
        if(usuario_master) where.usuario_master = usuario_master;
        if(supervisor) where.supervisor = supervisor;
        if(sms) where.sms = sms;
        if(correntista) where.correntista = correntista;
        if(gerente) where.gerente = gerente;
        if(tipo_parceiro2) where.tipo_parceiro2 = tipo_parceiro2;
        if(data_corte) where.data_corte = data_corte;
        if(empresa_sms) where.empresa_sms = empresa;
        if(convenio) where.convenio = convenio;
        if(data_vinculo) where.data_vinculo = data_vinculo;
        if(horario) where.horario = horario;
        if(etapa_sms) where.etapa_sms = etapa_sms;
        if(data_envio) where.data_envio = data_envio;
        if(validade_contrato) where.validade_contrato = validade_contrato;
        if(tipo_banco) where.tipo_banco = tipo_banco; 
        
        if (tipo_usuario === 'PARCEIRO' ){

            if (perfil === 'MATRIZ'){

                const idsParceiros = await acesso_completo.findAll({

                    attributes:[ 'id_acesso' ],

                    where: {  cnpj_matriz }
                });
                
                if( idsParceiros ){

                    var parceiros = [];

                    idsParceiros.forEach(element => {
                        parceiros.push(element.id_acesso)
                    });
                }


                where.id_acesso = parceiros;

                
                const propstasMatriz = await vw_proposta.findAll({

                    where
                })
                
                res.send(propstasMatriz)
            }

            if(perfil === 'SUB ACESSO'){

                where.id_acesso = id_acesso
          
                try {
                    
                        const parceiroSubAcesso =  await vw_proposta.findAll({

                            where
                        })

                        return res.status(200).send(parceiroSubAcesso)
                        
                        
                } catch (error) {

                        return res.status(500).send(error)   
                }

            }
        }

            
        switch(tipo_usuario) {

            case "SUPERVISOR":
                const idsDoSupervisor = await acesso_completo.findAll({

                    attributes:['id_acesso'],
                    where:{
            
                        supervisor:nome
                    }
                })
            
                if(idsDoSupervisor){
            
                    var idssup = [];
                    idsDoSupervisor.forEach(element => {
                        idssup.push(element.id_acesso)
                    });
            
                }

                where.id_acesso = idssup;

                const propstasSup = await vw_proposta.findAll({ where });

                res.status(200).send(propstasSup);
                break;

            case "GERENTE":

                const idsDoGerente = await acesso_completo.findAll({

                    attributes:['id_acesso'],
                    where:{
            
                        gerente:nome
                    }
                })
            
                if(idsDoGerente){
            
                    var idsger = [];
                    idsDoGerente.forEach(element => {
                        idsger.push(element.id_acesso)
                    });
            
                }

                where.id_acesso = idsger;

                const propstasGer = await vw_proposta.findAll({ where });

                res.status(200).send(propstasGer);
                break;
                
            case "SUPERINTENDENTE":

                const idsDoSuperintendente = await acesso_completo.findAll({

                    attributes:['id_acesso'],
                    where:{
            
                        superintendente:nome
                    }
                })
            
                if(idsDoSuperintendente){
            
                    var idssuper = [];
                    idsDoSuperintendente.forEach(element => {
                        idsuper.push(element.id_acesso)
                    });
            
                }

                where.id_acesso = idssuper;

                const propostasSuper = await vw_proposta.findAll({ where });

                res.status(200).send(propostasSuper);
                break;

            case "ADM":

                const propostasAdm = await vw_proposta.findAll({
                    where
                });

                res.status(200).send(propostasAdm);
                break;
            
            default:
                res.send("tipo usuario não aceito")
        }
    },


    CreateProposta: async ( req, res ) => {

        const{ parceiro, id_parceiro, supervisor, gerente, tipo_parceiro,   
            proposta,
            data_envio,
            banco,
            status,
            produto,
            tipo,
            entregue,
            valor_troco,
            convenio,
            banco_port1,
            numero_portabilidade,
            parcela,
            seguro,
            qtdp_pagaport1,
            nome,
            cpf,
            telefone_ddd_1,
            telefone1,
            correntista,
            telefone4,
            matricula,
            agendamento,
            dia,
            horario,
            exercito,
            senha_exercito,
            sexo,
            data_nascimento,
            email_cliente,
            uf,
            observacao,
            arquivo1,
            arquivo2,
            arquivo3,
            arquivo4,
            arquivo5,
            arquivo6,
            arquivo7,
            arquivo8,
            arquivo9
        } = req.body;

    }


}
module.exports = PropostaController;