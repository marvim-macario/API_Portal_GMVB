const {
    lista_cpf
} = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const ParceirosRestritosController = {

    InluirParcRest: async (req, res) => {
        
        const {
            cpf, 
            data_criacao, 
            responsavel,
            nome,
            cnpj,
            razao_social, 
            motivo,
            solicitante,
            nome_1,
            nome_2,
            nome_3,
            nome_4,
            cnpj_1,
            cnpj_2,
            cnpj_4,
            cnpj_3,
            parceiro,
            supervisor,
            gerente,
            id_acesso,
            cpf_parceiro,
            cpf_supervisor,
            cpf_gerente,
            data_inclusao,
            data_atualizacao
        } = req.body;

        const ParceirosRestritos = await lista_cpf.create({
            cpf: cpf,
            data_criacao:data_criacao, 
            responsavel:responsavel,
            nome:nome,
            cnpj:cnpj,
            razao_social:razao_social, 
            motivo:motivo,
            solicitante:solicitante,
            nome_1:nome_1,
            nome_2:nome_2,
            nome_3:nome_3,
            nome_4:nome_4,
            cnpj_1:cnpj_1,
            cnpj_2:cnpj_2,
            cnpj_4:cnpj_4,
            cnpj_3:cnpj_3,
            parceiro:parceiro,
            supervisor:supervisor,
            gerente:gerente,
            id_acesso:id_acesso,
            cpf_parceiro:cpf_parceiro,
            cpf_supervisor:cpf_supervisor,
            cpf_gerente:cpf_gerente,
            data_inclusao:data_inclusao,
            data_atualizacao:data_atualizacao
        });
        return res.status(200).send(ParceirosRestritos);
    },

    Filtro: async (req, res) => {
        const {
            userTipousuario,
            userPerfil,
            userCpf,
            userNome,
            usuario,
        
            parceiro,
            cnpj
        } = req.body;
        
        let where = {};
        if (usuario) where.usuario = {
            [Op.substring]: usuario
        };
        
        if (parceiro) where.parceiro = parceiro;
        if (cnpj) where.cnpj = cnpj;
        if (userTipousuario === 'PARCEIRO' && userPerfil === 'MATRIZ' || userTipousuario === 'PARCEIRO' && userPerfil === 'SUB ACESSO') where.cnpj = userCpf;
        if (userTipousuario === 'SUPERVISOR') where.supervisor = userNome;
        if (userTipousuario === 'GERENTE') where.gerente = userNome;
    
        try {
            const pesquisa = await lista_cpf.findAll({
                where
            })
            if (pesquisa)
                return res.status(200).json(pesquisa)
        } catch (error) {
            console.log(error)
        }
    },

    Modal: async (req, res) => {
        try {
            const {
                id_cpf
            } = req.body;

            const dadosParcRest = await lista_cpf.findOne({
                where: {id_cpf}
            })
            return res.status(200).send(dadosParcRest)
        } catch (error) {
            console.log(error)
            res.send(error);
        }
    },

    Alterar: async (req, res) => {
        const{
            id_cpf,
            cpf, 
            //data_criacao, 
            responsavel,
            nome,
            cnpj,
            razao_social, 
            motivo,
            solicitante,
            nome_1,
            nome_2,
            nome_3,
            nome_4,
            cnpj_1,
            cnpj_2,
            cnpj_4,
            cnpj_3,
            data_atualizacao
        } = req.body

        try {
            const BuscaParcRest = await lista_cpf.findOne({
                where: {id_cpf}
            })
            if(!BuscaParcRest){
                return res.send('Parceiro restrito inexistente')
            }

            BuscaParcRest.cpf = cpf
            BuscaParcRest.nome = nome
            BuscaParcRest.cnpj = cnpj
            BuscaParcRest.razao_social = razao_social
            BuscaParcRest.motivo = motivo
            BuscaParcRest.solicitante = solicitante
            BuscaParcRest.nome_1 = nome_1
            BuscaParcRest.nome_2 = nome_2
            BuscaParcRest.nome_3 = nome_3
            BuscaParcRest.nome_4 = nome_4
            BuscaParcRest.cnpj_1 = cnpj_1
            BuscaParcRest.cnpj_2 = cnpj_2
            BuscaParcRest.cnpj_4 = cnpj_4
            BuscaParcRest.cnpj_3 = cnpj_3
            BuscaParcRest.responsavel = responsavel
            BuscaParcRest.data_atualizacao = data_atualizacao
            BuscaParcRest.save()
            return res.status(200).json(BuscaParcRest)
        } catch (error) {
            console(error)
        }
    }

}
module.exports = ParceirosRestritosController;