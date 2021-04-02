// controller para popular selects das paginas 
const { cadastro,status_margem, status, tipo , empresa, banco, sub_status,filial, produto, proposta_comissao, banco_origi, lancamentos } = require('../models');

const Sequelize = require('sequelize');
const Op = Sequelize.Op

const PreencherCamposController = {

    Parceiro: async( req, res )=>{

        const { cnpj } = req.body;

        try {
            const parceiro = await cadastro.findAll({

                attributes:['parceiro'],
                where:{
                    cnpj
                }
            })

            if(!parceiro)
                return res.status(400).send({erro:"nao encontrado"});

            return res.status(200).send(parceiro);
        } catch (error) {

            return res.status(500).send({erro:"erro interno"});
        }
      

    },

    Secundario:async( req, res )=>{

        const { cnpj } = req.body;

        const supervisor = await cadastro.findAll({
            attributes: ['parceiro'],
            where: {
                tipo_func: {
                    [Op.in]: ['SUPERVISOR MEI', 'SUPERVISOR'],
                },
                status: 'ATIVO',
                cnpj:cnpj
            },
           
        });

        res.status(200).send(supervisor);
    },
    Terceario: async( req, res )=>{
        const { cnpj } = req.body;

    try {
        const gerentes = await cadastro.findAll({
            attributes: ['gerente'],
            where: {
                tipo_func: {
                    [Op.in]: ['GERENTE MEI', 'GERENTE'],
                },
                status: 'ATIVO',
                cnpj:cnpj
            }
        });
        res.status(200).send(gerentes)

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

   
},
    
    Status: async (req, res) => {

        try {

            const statusPropostas = await status.findAll({
                attributes: ['status']
            })
            res.status(200).send(statusPropostas);

        }catch(error) {

            res.status(500).send(error)
        }
    },

    Tipo: async (req, res) => {
        try {
            const TipoPropostas = await tipo.findAll({

                attributes: ['tipo']
            })

            res.send(TipoPropostas)

        } catch (error) {
            res.send(error)
        }
    },

    Empresa: async (req,res) => {
        try {
            const Empresa = await empresa.findAll({
                attributes: ['empresa']
            })
            res.send(Empresa)

        } catch (error) {

            res.send(error)
        }
    },

    Banco: async(req, res) => {
        try {
            const bancos = await banco.findAll({})
            res.send(bancos)
        } catch (error) {
            res.send(error)
        }
    },

    SubStatus: async (req, res) => {
        // console.log(req)
        try {
            const sub = await sub_status.findAll({
                attributes:['sub_status']
                
            })
            res.send(sub);
           
        } catch (error) {
            console.log(error)
        }
    },
    

    Produto: async (req, res) => {

        try {
            const prod = await produto.findAll({})
            res.send(prod)
        } catch (error) {
            res.send(error)
        }
    },

    ///retirar
    SupervisorMulti: async(req, res)=>{
        const supervisorMulti = await cadastro.findAll({
            attributes:['supervisor_sant'],
           
        });

        res.send(supervisorMulti);
    },


    Supervisor: async (req, res) => {

        const supervisor = await cadastro.findAll({
            attributes: ['parceiro'],
            where: {
                tipo_func: {
                    [Op.in]: ['SUPERVISOR MEI', 'SUPERVISOR'],
                },
                status: 'ATIVO'
            },
            order: [
                ['parceiro', 'asc']
            ]
        });

        res.status(200).send(supervisor);
    },
    Gerente: async (req, res) => {
        try {
            const gerentes = await cadastro.findAll({
                attributes: ['gerente'],
                where: {
                    tipo_func: {
                        [Op.in]: ['GERENTE MEI', 'GERENTE'],
                    },
                    status: 'ATIVO'
                },
                order: [
                    ['gerente', 'asc']
                ]
            });
            res.status(200).send(gerentes)

        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
       

       
    },

    Funcionario: async (req, res) => {

        var query = `${req.query.nome}`;

        console.log(query)
        const funcionario = await cadastro.findAll({

            attributes: ['parceiro'],
            where: {
                parceiro: {
                    [Op.substring]: query
                }
            }
        });
        res.status(200).send(funcionario);
    },

    Filial: async (req, res) => {

        const filiais = await filial.findAll({
            attributes: ['filial']

        });
        res.status(200).send(filiais);
    },
    
    Promotor: async (req, res) => {
        
        const promotor = await proposta_comissao.findAll({
            attributes:['parceiro'],
            group:['parceiro']

        })

        res.status(200).send(promotor); 
    },

    StausComissao: async (req, res ) => {

        const statusComissao = await proposta_comissao.findAll({

            attributes:['status'],
            group:['status']
        })

        res.status(200).send(statusComissao)
    },
    DataPagamentoGerente: async ( req, res ) => {

        const dataPagamentoGerente = await proposta_comissao.findAll({
            attributes:['data_ger'],
            group:['data_ger']
        })

        res.status(200).send(dataPagamentoGerente);
    },
    DataPagamentoSupervisor: async ( req, res ) => {

        const dataPagamentoSupervisor = await proposta_comissao.findAll({
            attributes:['data_sup'],
            group:['data_sup']
        })

        res.status(200).send(dataPagamentoSupervisor);
    },
    Competencia: async ( req, res ) => {
        const competencia = await proposta_comissao.findAll({
            attributes:['competencia'],
            group:['competencia']
        })

        res.status(200).send(competencia);
    },
    StatusMargem: async (req,res)=>{
       try {
           
      
        const status = await status_margem.findAll({
            order: [
                ['status', 'asc']
            ]
        })

        if(status)
            return res.status(200).send(status);

    } catch (error) {
           console.log(error)
    }
},

/* Supervisor: async (req, res) => {

        const supervisor = await cadastro.findAll({
            attributes: ['parceiro'],
            where: {
                tipo_func: {
                    [Op.in]: ['SUPERVISOR MEI', 'SUPERVISOR'],
                },
                status: 'ATIVO'
            },
            order: [
                ['parceiro', 'asc']
            ]
        });

        res.status(200).send(supervisor);
    }*/

    BancoOrigi: async (req, res) =>{

        const bancoOrigi = await banco_origi.findAll({
            attributes: ['banco'],
            where: {
                tipo_banco: {
                    [Op.in]: ['MULTI BANCOS'],
                }
            },
            order: [
                ['banco', 'asc']
            ]
        });
        res.status(200).send(bancoOrigi);
    }
}

module.exports = PreencherCamposController