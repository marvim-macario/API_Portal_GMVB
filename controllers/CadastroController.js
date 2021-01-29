const { cadastro, filial, base_chave, siglae } = require('../models/');


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
            cnpj,
            tipo_documento,
            data_rg,
            orgao_emissao,	 
            nome_mae,
            pis,
            telefone,
            email,
            cep,
            numero_l,
            complemento,
            bairro,
            cidade,
            logradouro,
            uf_carteira,
            favorecido,
            tipo_pagamento,
            banco,
            agencia,
            conta,
            numero_cartao,
            supervisor,
            gerente,
            supervisor_sant,
            gerente_sant,
            superintendente,
            projeto,
            cod_funcao,
            cargo,
            setor,
            codigo,
            matricula,
            repre,
            data_certificacao,
            certificacao,
            data_bloqueio,
            carteira,
            serie_carteira,
            contrato,
            naturalidade,	
            cpf,	
            cpf_repre,  
            regra_pagamento,	
            data_contrato,	
            comissao,
            secundario,
            pct_secundario,
            terceario,
            pct_terceario,
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
            registro_clt,
            chave,
            statusj,
            funcao,
            empresa,
            data_envio,
            senha,
            motivo_cancelamentoj,
            tipo_chave,
            data_inativacaoj,
            sigla,
            codigo_corban,
            nome_corban,
            status_e,
            data_inativacao_sigla,
            motivo_pendencia,
            sigla_prospect,
            cpf_usuario_1,
            usa_esteira1,
            usa_siglai1,
            observacao,

        } = req.body;
       
        try {
                //verifica se há usuário cadastrado
                const user = await cadastro.findOne({
                    
                    where: { cnpj,  parceiro, cpf }
                })

                if (user)
                    return res.status(403).send('não foi possivel cadastrar usuario, cpf existente na base de dados');

                //salvando dados na tabela cadastro
                const createdCadastro = await cadastro.create({
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
                    cnpj,
                    tipo_documento,
                    data_rg,
                    orgao_emissao,	 
                    nome_mae,
                    pis,
                    telefone,
                    email,
                    cep,
                    numero_l,
                    complemento,
                    bairro,
                    cidade,
                    logradouro,
                    uf_carteira,
                    favorecido,
                    tipo_pagamento,
                    banco,
                    agencia,
                    conta,
                    numero_cartao,
                    supervisor,
                    gerente,
                    supervisor_sant,
                    gerente_sant,
                    superintendente,
                    projeto,
                    cod_funcao,
                    cargo,
                    setor,
                    codigo,
                    matricula,
                    repre,
                    data_certificacao,
                    certificacao,
                    data_bloqueio,
                    carteira,
                    serie_carteira,
                    contrato,
                    naturalidade,	
                    cpf,	
                    cpf_repre,  
                    regra_pagamento,	
                    data_contrato,	
                    comissao,
                    secundario,
                    pct_secundario,
                    terceario,
                    pct_terceario,
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
                    registro_clt
                })
                // return res.status(201).send('usuario cadastrado com sucesso');
                const createdChavej = await base_chave.create({
                    chave,
                    cpf_usuario:cnpj,
                    status:statusj,
                    funcao,
                    empresa,
                    data_envio,
                    senha,
                    motivo_cancelamento:motivo_cancelamentoj,
                    tipo_chave,
                    data_inativacao:data_inativacaoj
                })

                const createdSiglae = await siglae.create({
                    siglae:sigla,
                    cpf_sigla:cnpj,
                    codigo_corban,
                    nome_corban,
                    status_e,
                    data_inativacao:data_inativacao_sigla,
                    motivo_pendencia,
                    sigla_prospect,
                    cpf_usuario_1,
                    usa_esteira1,
                    usa_siglai1,
                    observacao
                })
        
            return res.status(200).send({sucesso:"usuario cadastrado com sucesso"})
            

        } catch(error){
                console.log(error)
                res.status(500).send({erro:error});
        }
    },

    Modal: async (req,res)=>{
        try {
            
      
        const { cpf } = req.body;

        const dadosDeCadastro = await cadastro.findOne({
            where:{ cpf }
        })

        const dadosDechave = await base_chave.findOne({
            where:{ cpf_usuario: cpf}
        })

        const dadosDesigla = await siglae.findOne({

            // attributes:{ exclude:[ 'siglae' ] },

            where: { cpf_usuario1:cpf }
        })

        return res.status(200).send({

            dados_cadastro:dadosDeCadastro,

            dados_chave:dadosDechave,

            dados_sigla:dadosDesigla
        })
    } catch (error) {

            console.log(error);
            res.send(error)
    }

 
    }
}
module.exports = CadastroController