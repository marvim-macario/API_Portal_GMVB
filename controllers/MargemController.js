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
            if(userTipousuario ==='PARCEIRO'&& userPerfil==='MATRIZ' || userTipousuario ==='PARCEIRO'&& userPerfil==='SUB ACESSO') where.cnpj = userCpf;
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
    Incluir: async (req,res) => {

        const {
            id_parceiro,
            data_envio,
            parceiro,
            cpf,
            matricula,
            convenio,
            responsavel,
            senha,
            valor_margem,
            gerente,
            supervisor,
            userPerfil,
            userCpf,
            userTipousuario,
            userNome,
            userCnpjMatriz, 
        } = req.body;

            const where = new Object();
            if(data_envio) where.data_cadastro = data_envio;
            if(parceiro) where.parceiro = parceiro;
            if(cpf) where.cpf = cpf;
            if(matricula) where.matricula = matricula;
            if(convenio) where.convenio = convenio;
            if(senha) where.senha = senha;
            if(valor_margem) where.valor_margem = valor_margem;
            where.id_parceiro = id_parceiro;
            where.responsavel = userNome;
            where.gerente = gerente;
            where.supervisor = supervisor;
            where.cnpj =  userCpf;

            try {

                const pesquisaMargem = await margem.findAll({

                    where
                })

                if(!pesquisaMargem)
                    return res.status(200).json({resp:"Margem já cadastradana base de dados"});

                const createMargem = await margem.create({
                  
                        convenio,
                        cpf,
                        matricula,
                        parceiro,
                        data_envio,
                        responsavel,
                        id_parceiro,
                        senha,
                        valor_margem,
                        cnpj_matriz:userCnpjMatriz,
                        supervisor,
                        gerente
                    
                })
                if(createMargem)
                    res.json(createMargem.codigo)
            } catch (error) {
                
                console.log(error)
            }

    },

     Anexo: async(req, res) =>{

        const { codigo } = req.query;
        const{ anexo_print_margem } = req.file;

        const arquivo1 = req.file.originalname;
        console.log(req.file)
        try {
    
            const margemPesquisa = await margem.findOne({
                where:{
                    codigo
                }
            })

            if(margemPesquisa){
                margemPesquisa.arquivo1 = arquivo1;
                margemPesquisa.save()

                res.status(201).json(margemPesquisa)
            }
        } catch (error) {
              console.log(error)  
        }    

     },

     Modal: async(req, res) =>{
        try{
            const {
                cpf
            } = req.body;

            const dadosMargem = await margem.findOne({
                where: {cpf}
            })
            return res.status(200).send(dadosMargem)

        }   catch (error) {
            console.log(error)
            res.send(error);
        }
     },

     Update: async (req, res) => {

        const { codigo,data_envio,parceiro,cpf,matricula,convenio,senha,valor_margem } = req.body;

        try {

        const BuscaMargem = await margem.findOne({

            where:{
                codigo
            }
        })

           
            if(BuscaMargem){
                
                BuscaMargem.data_envio = data_envio
                BuscaMargem.parceiro = parceiro
                BuscaMargem.cpf = cpf
                BuscaMargem.matricula = matricula
                BuscaMargem.convenio = convenio
                BuscaMargem.senha = senha
                BuscaMargem.valor_margem = valor_margem

                BuscaMargem.save();

                res.status(200).send(BuscaMargem)
            }
        } catch (error) {
            console.log(error)
        }
     }
     

};

module.exports = MargemController;