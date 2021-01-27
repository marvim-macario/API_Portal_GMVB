const { cadastro, filial, chavej } = require('../models/');


const Sequelize = require('sequelize');
const Op = Sequelize.Op

const CadastroController = {
    //get buscar campos
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

        const gerente = await cadastro.findAll({
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

        res.status(200).send(gerente);
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

    // pesquisa geral 
    FullSearch: async (req, res) => {
        const {
            parceiro,
            cnpj,
            status,
            supervisor,
            gerente,
            filial,
            mes_admissao,
            mes_demissao,
            tipo,
            superintendente
        } = req.body;



        let consulta = {
            'parceiro': parceiro,
            'cnpj': cnpj,
            'status': status,
            'supervisor': supervisor,
            'gerente': gerente,
            'filial': filial,
            'data_admissao': mes_admissao,
            'data_inativacao': mes_demissao,
            'tipo': tipo,
            'superintendente': superintendente
        }

        function clean(obj) {
            for (var propName in obj) {
                if (obj.parceiro !== null && obj.parceiro !== '' && obj.parceiro !== undefined) {
                    obj.parceiro = {
                        [Op.substring]: parceiro
                    }
                } else {
                    delete obj.parceiro;
                }
                if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
                    delete obj[propName];

                }


            }
        }
        if(!consulta)
            return res.status(400).send('não foi possivel consultar resultados!');


        clean(consulta);
        console.log(consulta);

        try {
            const person = await cadastro.findAll({
                
                where: consulta
            

            })
            if (!person)
                return res.status(400).send({
                    erro: "usuario não encontrado"
                })
            res.status(200).send(person);

        } catch (err) {
            console.log(err);
            return res.status(400).send({
                erro: "não foi possivel fazer a consulta, tente novamente."
            });
        }
    },



    Create: async (req, res) => {

        const {
            filial,
            parceiro,
            nome_completo,
            tipo,
            status,
            data_admissao,
            data_inativacao,
            motivo_cancelamento,
            experiencia1,
            experiencia2,
            data_nascimento,
            cpf,
            tipo_documento,
            data_rg,
            orgao_emissao,
            nome_mae,
            naturalidade,
            pis,
            telefone_contato,
            email_contato,
            cep,
            numero_l,
            complemento,
            bairro,
            cidade,
            tipo_pagamento,
            banco,
            agencia,
            logradouro,
            conta,
            numero_cartao,
            superintendente,
            projeto,
            cargo,
            setor,
            matricula,
            cnpj,
            certificacao,
            data_bloqueio,
            carteira,
            serie_carteira,
            supervisor,
            gerente,
            supervisor_sant,
            gerente_sant,
            cod_funcao,
            cpf_repre,
            data_certificacao,
            tipo_aneps,
            entregue,
            comissao,
            quaternario,
            pct_quaternario,
            comissao_novo,
            comissao_novo_sup,
            comissao_novo_ger,
            comissao_novo_quat,
            qua_sant2,
            comissao_inss,
            comissao_inss_sup,
            comissao_inss_ger,
            comissao_inss_quat,
            governo_minas,
            governo_minas_sup,
            governo_minas_ger,
            governo_minas_quat,
            prefeitura_rio,
            prefeitura_rio_sup,
            prefeitura_rio_ger,
            prefeitura_rio_quat,
            tabela_multi,
            tabela_sim
        } = req.body;


        const user = await cadastro.findOne({
            where: {
                cnpj,
                parceiro,
                cpf
            }
        })
        if (user)
            return res.status(403).send('não foi possivel cadastrar usuario, cpf existente na base de dados');

        const created = await cadastro.create({
            cnpj: cnpj,
            cpf: cpf,
            parceiro: parceiro,
            filial: filial,
            parceiro: parceiro,
            nome_completo: nome_completo,
            tipo: tipo,
            status: status,
            data_admissao: data_admissao,
            data_inativacao: data_inativacao,
            motivo_cancelamento: motivo_cancelamento,
            experiencia1: experiencia1,
            experiencia2: experiencia2,
            data_nascimento: data_nascimento,
            cpf: cpf,
            tipo_documento: tipo_documento,
            data_rg: data_rg,
            orgao_emissao: orgao_emissao,
            nome_mae: nome_mae,
            naturalidade: naturalidade,
            pis: pis,
            telefone_contato: telefone_contato,
            email_contato: email_contato,
            cep: cep,
            logradouro: logradouro,
            numero_l: numero_l,
            complemento: complemento,
            bairro: bairro,
            cidade: cidade,
            tipo_pagamento: tipo_pagamento,
            banco: banco,
            agencia: agencia,
            conta: conta,
            numero_cartao: numero_cartao,
            superintendente: superintendente,
            projeto: projeto,
            cargo: cargo,
            setor: setor,
            matricula: matricula,
            cnpj: cnpj,
            certificacao: certificacao,
            data_bloqueio: data_bloqueio,
            carteira: carteira,
            serie_carteira: serie_carteira,
            naturalidade: naturalidade,
            supervisor: supervisor,
            gerente: gerente,
            supervisor_sant: supervisor_sant,
            gerente_sant: gerente_sant,
            cod_funcao: cod_funcao,
            cpf_repre: cpf_repre,
            data_certificacao: data_certificacao,
            tipo_pagamento: tipo_pagamento,
            tipo_aneps: tipo_aneps,
            entregue: entregue,
            comissao:comissao,
            quaternario:quaternario,
            pct_quaternario:pct_quaternario,
            comissao_novo:comissao_novo,
            comissao_novo_sup:comissao_novo_sup,
            comissao_novo_ger:comissao_novo_ger,
            comissao_novo_quat:comissao_novo_quat,
            qua_sant2:qua_sant2,
            comissao_inss:comissao_inss,
            comissao_inss_sup:comissao_inss_sup,
            comissao_inss_ger:comissao_inss_ger,
            comissao_inss_quat:comissao_inss_quat,
            governo_minas:governo_minas,
            governo_minas_sup:governo_minas_sup,
            governo_minas_ger:governo_minas_ger,
            governo_minas_quat:governo_minas_quat,
            prefeitura_rio:prefeitura_rio,
            prefeitura_rio_sup:prefeitura_rio_sup,
            prefeitura_rio_ger:prefeitura_rio_ger,
            prefeitura_rio_quat:prefeitura_rio_quat,
            tabela_multi:tabela_multi,
            tabela_sim:tabela_sim
        })
        return res.status(201).send('usuario cadastrado com sucesso');
    },
    CadastroChave: async( req, res) => {

    }
}

module.exports = CadastroController