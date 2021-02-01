// controller para popular selects das paginas 
const { cadastro, vw_proposta, status, tipo , empresa, banco, substatus, produto } = require('../models');

const Sequelize = require('sequelize');
const Op = Sequelize.Op

const PreencherCamposController = {
    
    Quaternario: async (req , res) => {

        try {
            const quaternario = await cadastro.findAll({
                attributes:['parceiro'],
                where:{ status:'ATIVO' }
            });
            res.status(200).send(quaternario);

        } catch(error){

            res.status(500).send(error);
            console.log(error); 
        }
    },

    PctQuaternario: async ( req, res ) => {

        try{

            const pctQuaternario = await cadastro.findAll({

                attributes:['pct_quaternario']
            });

            res.status(200).send(pctQuaternario);

        }catch(error){

            res.status(500).send(error)
            console.log(error)
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


    //get buscar campos 
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

    //get buscar campos
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