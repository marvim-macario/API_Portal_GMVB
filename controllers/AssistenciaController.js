
const {
    assistencia
} = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const AssistenciaController = {


    AssIncluir: async (req, res) => {
        const {
            cliente_nome,
            cliente_cpf,
            data_nascimento,
            cep,
            rua,      
            bairro,
            numero,
            complemento,
            email,
            telefone,
            tipo_contratacao,
            banco,
            agencia,
            conta,
            digito,
            tipo_conta,
            status,
            tipo_assistencia,
            forma_contratacao,
            parceiro,
            id_parceiro,
            cpf_parceiro,
            supervisor,
            gerente,
            data_inclusao,
            responsavel_alteracao,
            data_alteracao
        } = req.body;

//colocar aqui um if de altenticacao

        if (
                typeof cliente_nome != undefined && cliente_nome !='' &&
                typeof  cliente_cpf != undefined && cliente_cpf !='' &&
                typeof  data_nascimento != undefined && data_nascimento !='' &&
                typeof   cep != undefined && cep !='' &&
                typeof   rua  != undefined &&   rua !='' &&
                typeof   bairro != undefined && bairro !='' &&
                typeof   numero != undefined && numero !='' &&
                typeof   complemento != undefined && complemento !='' &&
                typeof  email != undefined && email !='' &&
                typeof   telefone != undefined && telefone !='' &&
                typeof   tipo_contratacao != undefined && tipo_contratacao !='' &&
                typeof   banco != undefined && banco !='' &&
                typeof   agencia != undefined && agencia !='' &&
                typeof   conta != undefined && conta !='' &&
                typeof   digito != undefined && digito !='' &&
                typeof   tipo_conta != undefined && tipo_conta !='' &&
                typeof   status != undefined && status !='' &&
                typeof    tipo_assistencia != undefined && tipo_assistencia !='' &&
                typeof    forma_contratacao != undefined && forma_contratacao !='' &&
                typeof   parceiro != undefined && parceiro !='' &&
                typeof   id_parceiro != undefined && id_parceiro !='' &&
                typeof   cpf_parceiro != undefined && cpf_parceiro !='' &&
                typeof   supervisor != undefined && supervisor !='' &&
                typeof   gerente != undefined && gerente !='' &&
                typeof   data_inclusao != undefined && data_inclusao !='' &&
                typeof   responsavel_alteracao != undefined && responsavel_alteracao !='' &&
                typeof   data_alteracao!= undefined && data_alteracao !='' 
       
        
        ){ 
        const assistenciaInserir = await assistencia.create({
            cliente_nome,
            cliente_cpf,
            data_nascimento,
            cep,
            rua,      
            bairro,
            numero,
            complemento,
            email,
            telefone,
            tipo_contratacao,
            banco,
            agencia,
            conta,
            digito,
            tipo_conta,
            status,
            tipo_assistencia,
            forma_contratacao,
            parceiro,
            id_parceiro,
            cpf_parceiro,
            supervisor,
            gerente,
            data_inclusao,
            responsavel_alteracao,
            data_alteracao
        })

        return res.status(201).json(assistenciaInserir)
    }else{return res.status(500).send({erro:"Por favor, preencha os dados obrigatórios"})}
},

    
    AssAlterar: async (req, res) => {
        const {
            codigo,
            cliente_nome,
            cliente_cpf,
            data_nascimento,
            cep,
            rua,      
            bairro,
            numero,
            complemento,
            email,
            telefone,
            tipo_contratacao,
            banco,
            agencia,
            conta,
            digito,
            tipo_conta,
            status,
            tipo_assistencia,
            forma_contratacao,
            parceiro,
            id_parceiro,
            cpf_parceiro,
            supervisor,
            gerente,
            data_inclusao,
            responsavel_alteracao,
            data_alteracao
        } = req.body;

        const assistenciaInserir = await assistencia.update({ 
            cliente_nome,
            cliente_cpf,
            data_nascimento,
            cep,
            rua,      
            bairro,
            numero,
            complemento,
            email,
            telefone,
            tipo_contratacao,
            banco,
            agencia,
            conta,
            digito,
            tipo_conta,
            status,
            tipo_assistencia,
            forma_contratacao,
            parceiro,
            id_parceiro,
            cpf_parceiro,
            supervisor,
            gerente,
            data_inclusao,
            responsavel_alteracao,
            data_alteracao
          }, {
            where: {codigo: codigo},
            returning: true, 
            plain: true 
        })
        return res.status(200).json(assistenciaInserir)
    },


        AssFiltrar: async (req, res) => {
            const {
                cliente_cpf,
                tipo_contratacao,
                banco,
                tipo_assistencia,
                forma_contratacao
            } = req.body;

            const assistenciaInserir = await assistencia.findAll({ 
                where: {
                    [Op.or]: [
                      { cliente_cpf: cliente_cpf },
                      { tipo_contratacao: tipo_contratacao },
                      { banco: banco },
                      { tipo_assistencia: tipo_assistencia },
                      { forma_contratacao: forma_contratacao }
                    ]}
            })
            return res.status(200).json(assistenciaInserir)
        }




}
module.exports = AssistenciaController;
