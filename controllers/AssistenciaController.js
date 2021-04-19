
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
    }

}
module.exports = AssistenciaController;