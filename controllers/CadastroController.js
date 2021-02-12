const { cadastro, filial, base_chave, siglae, acessos } = require('../models/');


const Sequelize = require('sequelize');
const Op = Sequelize.Op

const CadastroController = {
    //get buscar campos
   

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
        // console.log(consulta);

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

    },
    Update: async (req, res) => {

        const { id_parceiro,
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
            observacao
        } = req.body;

        try {

            const tabelaCadastro = await cadastro.findOne({

                where:{ id_parceiro} 
            })
            if(!tabelaCadastro)
                return res.send({erro:'usuario não encotrado'});
            
            tabelaCadastro.filial = filial;
            tabelaCadastro.parceiro = parceiro;
            tabelaCadastro.nome_completo = nome_completo;
            tabelaCadastro.tipo = tipo
            tabelaCadastro.status = status
            tabelaCadastro.data_admissao = data_admissao
            tabelaCadastro.data_inativacao = data_inativacao
            tabelaCadastro.motivo_cancelamento = motivo_cancelamento
            tabelaCadastro.experiencia1 = experiencia1
            tabelaCadastro.experiencia2 = experiencia2
            tabelaCadastro.data_nascimento = data_nascimento
            tabelaCadastro.cnpj = cnpj
            tabelaCadastro.tipo_documento = tipo_documento
            tabelaCadastro.data_rg = data_rg
            tabelaCadastro.orgao_emissao = orgao_emissao	 
            tabelaCadastro.nome_mae = nome_mae
            tabelaCadastro.pis = pis
            tabelaCadastro.telefone = telefone
            tabelaCadastro.email = email
            tabelaCadastro.cep = cep
            tabelaCadastro.numero_l = numero_l
            tabelaCadastro.complemento = complemento
            tabelaCadastro.bairro = bairro
            tabelaCadastro.cidade = cidade
            tabelaCadastro.logradouro = logradouro
            tabelaCadastro.uf_carteira = uf_carteira
            tabelaCadastro.favorecido = favorecido
            tabelaCadastro.tipo_pagamento = tipo_pagamento
            tabelaCadastro.banco = banco
            tabelaCadastro.agencia = agencia
            tabelaCadastro.conta = conta
            tabelaCadastro.numero_cartao = numero_cartao 
            tabelaCadastro.supervisor = supervisor
            tabelaCadastro.gerente = gerente
            tabelaCadastro.supervisor_sant = supervisor_sant 
            tabelaCadastro.gerente_sant = gerente_sant
            tabelaCadastro.superintendente = superintendente
            tabelaCadastro.projeto = projeto
            tabelaCadastro.cod_funcao = cod_funcao
            tabelaCadastro.cargo = cargo
            tabelaCadastro.setor = setor
            tabelaCadastro.codigo = cargo
            tabelaCadastro.matricula = matricula
            tabelaCadastro.repre = repre
            tabelaCadastro.data_certificacao = data_certificacao 
            tabelaCadastro.certificacao = certificacao
            tabelaCadastro.data_bloqueio = data_bloqueio
            tabelaCadastro.carteira = carteira
            tabelaCadastro.serie_carteira = serie_carteira
            tabelaCadastro.contrato = contrato
            tabelaCadastro.naturalidade = naturalidade
            tabelaCadastro.cpf = 	cpf
            tabelaCadastro.cpf_repre = cpf_repre   
            tabelaCadastro.regra_pagamento = 	regra_pagamento
            tabelaCadastro.data_contrato = data_contrato
            tabelaCadastro.comissao = comissao
            tabelaCadastro.secundario = secundario
            tabelaCadastro.pct_secundario = pct_secundario
            tabelaCadastro.terceario = terceario
            tabelaCadastro.pct_terceario = pct_terceario
            tabelaCadastro.quaternario = quaternario
            tabelaCadastro.pct_quaternario = pct_quaternario
            tabelaCadastro.comissao_novo = comissao_novo
            tabelaCadastro.comissao_novo_sup = comissao_novo_sup
            tabelaCadastro.comissao_novo_ger = comissao_novo_ger
            tabelaCadastro.comissao_novo_quat = comissao_novo_quat
            tabelaCadastro.qua_sant2 = qua_sant2
            tabelaCadastro.comissao_inss = comissao_inss
            tabelaCadastro.comissao_inss_sup = comissao_inss_sup
            tabelaCadastro.comissao_inss_ger = comissao_inss_ger
            tabelaCadastro.comissao_inss_quat = comissao_inss_quat
            tabelaCadastro.governo_minas = governo_minas
            tabelaCadastro.governo_minas_sup = governo_minas_sup
            tabelaCadastro.governo_minas_ger = governo_minas_ger
            tabelaCadastro.governo_minas_quat = governo_minas_quat
            tabelaCadastro.prefeitura_rio = prefeitura_rio
            tabelaCadastro.prefeitura_rio_sup = prefeitura_rio_sup
            tabelaCadastro.prefeitura_rio_ger = prefeitura_rio_ger
            tabelaCadastro.prefeitura_rio_quat = prefeitura_rio_quat
            tabelaCadastro.registro_clt = registro_clt 

            await tabelaCadastro.save()

        } catch (error) {
            res.send('erro cad')
            console.log(error)
        }
        try {
            const tabelaChavej = await base_chave.findOne({
                where:{
                    cpf_usuario:cnpj
                }
            })
            tabelaChavej.chave = chave
            tabelaChavej.status = statusj,
            tabelaChavej.funcao = funcao
            tabelaChavej.empresa = empresa
            tabelaChavej.data_envio = data_envio
            tabelaChavej.senha = senha
            tabelaChavej.motivo_cancelamento = motivo_cancelamentoj
            tabelaChavej.tipo_chave = tipo_chave
            tabelaChavej.data_inativacao = data_inativacaoj

            tabelaChavej.save()
    } catch (error) {
        console.log(error)
        res.send('erro chave')
    }
    try {
        const tabelaSigla = await siglae.findOne({
            where:{
                cpf_sigla:cnpj,
            }
        })
        tabelaSigla.siglae = sigla
        tabelaSigla.codigo_corban = codigo_corban
        tabelaSigla.nome_corban = nome_corban
        tabelaSigla.status_e = status_e
        tabelaSigla.data_inativacao = data_inativacao_sigla,
        tabelaSigla.motivo_pendencia = motivo_pendencia
        tabelaSigla.sigla_prospect = sigla_prospect
        tabelaSigla.cpf_usuario_1 = cpf_usuario_1
        tabelaSigla.usa_esteira1 = usa_esteira1
        tabelaSigla.usa_siglai1 = usa_siglai1
        tabelaSigla.observacao = observacao

    } catch (error) {
        console.log(error)
        res.send('erro sigla')
    }

     return res.status(200).send('acesso alterado');
    // try {
    //     const tabelaAcesso = acessos.findOne({
    //         where:{
                
    //         }
    //     })
    // } catch (error) {
        
    // }
    }
  


}
module.exports = CadastroController