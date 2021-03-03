const { margem } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op


const MargemController ={

    Pesquisar: async (req, res)=>{
        const { 
                userPerfil,
                userCpf,
                userTipousuario,
                userNome,
                userCnpjMatriz,

                parceiro,
                status,
                data_atualizacao,
                data_envio,
                cpf
        }=req.body;
        var where ={};
            if(parceiro) where.parceiro = {[Op.substring]: parceiro}; 
            if(status) where.status = status;
            if(data_atualizacao) where.data_atualizacao = data_atualizacao;
            if(data_envio) where.data_envio = data_envio;
            if(cpf) where.cpf = cpf
            if(userTipousuario ==='PARCEIRO'&& userPerfil==='MATRIZ' || userTipousuario ==='PARCEIRO'&& userPerfil==='SUB ACESSO') where.cnpj_matriz = userCpf;
            if(userTipousuario ==='SUPERVISOR') where.supervisor = userNome;
            if(userTipousuario ==='GERENTE') where.gerente = userNome;
            console.log(where);
            try {
                const pesquisa = await margem.findAll({
                    where
                })

                if(pesquisa)
                    return res.status(200).json(pesquisa)
            } catch (error) {
                console.log(error)
            }
    },
    Incluir: async (req,res) =>{

        const {
            data_cadastro,parceiro,cpf,matricula,convenio, responsavel,
            gerente,
            supervisor,
            userPerfil,
            userCpf,
            userTipousuario,
            userNome,
            userCnpjMatriz, 
        } = req.body;

            const where = new Object();
            if(data_cadastro) where.data_cadastro = data_cadastro;
            if(parceiro) where.parceiro = parceiro;

    }

};

module.exports = MargemController;