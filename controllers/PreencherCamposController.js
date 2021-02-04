// controller para popular selects das paginas 
const { cadastro, vw_proposta, status, tipo , empresa, banco, substatus,filial, produto, } = require('../models');

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
            const sub = await substatus.findAll({
                // attributes:['sub_status']
                
            })
            res.send(sub);
        } catch (error) {
            res.send(error)
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

    // GerenteMullti: async (req, res)=>{
    //     const gerente
    // },


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




}

module.exports = PreencherCamposController