const {
    vw_proposta,
    acesso_completo,
    propostas,
} = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op




const PropostaController = {


    Interface: async (req, res) => {

        const {
            id_acesso,
            cnpj_matriz,
            perfil,
            tipo_usuario,
            nome,
            parceiro,
            tipo_parceiro,
            proposta,
            status,
            tipo,
            cpf,
            empresa,
            mes,
            previsao_retorno,
            novo_proposta,
            banco,
            data_envio,
            data_atualizacao,
            correntista,
            sub_status,
            classificacao,
            situacao,
            master,
            tipo_fase,
            banco_origi,
            produto,
            usuario_master,
            supervisor,
            sms,
            gerente,
            tipo_parceiro2,
            data_corte,
            empresa_sms,
            convenio,
            // data_vinculo,
            horario,
            validade_contrato,
            etapa_sms,
            tipo_banco,

        } = req.body;

        var where = {};

        if (parceiro) where.parceiro = {
            [Op.substring]: parceiro
        }
        if (tipo_parceiro) where.tipo_parceiro = tipo_parceiro;
        if (proposta) where.proposta = proposta;
        if (status) where.status = status;
        if (tipo) where.tipo = tipo;
        if (cpf) where.cpf = cpf;
        if (empresa) where.empresa = empresa;
        if (mes) where.mes = mes;
        if (previsao_retorno) where.previsao_retorno = previsao_retorno;
        if (novo_proposta) where.novo_proposta = novo_proposta;
        if (banco) where.banco = banco
        if (data_atualizacao) where.data_atualizacao = data_atualizacao;
        if (sub_status) where.sub_status = sub_status;
        if (classificacao) where.classificacao = classificacao;
        if (situacao) where.situacao = situacao;
        if (master) where.master = master;
        if (tipo_fase) where.tipo_fase = tipo_fase;
        if (banco_origi) where.banco_origi = banco_origi;
        if (produto) where.produto = produto;
        if (classificacao) where.classificacao = classificacao;
        if (usuario_master) where.usuario_master = usuario_master;
        if (supervisor) where.supervisor = supervisor;
        if (sms) where.sms = sms;
        if (correntista) where.correntista = correntista;
        if (gerente) where.gerente = gerente;
        if (tipo_parceiro2) where.tipo_parceiro2 = tipo_parceiro2;
        if (data_corte) where.data_corte = data_corte;
        if (empresa_sms) where.empresa_sms = empresa;
        if (convenio) where.convenio = convenio;
        // if (data_vinculo) where.data_vinculo = data_vinculo;
        if (horario) where.horario = horario;
        if (etapa_sms) where.etapa_sms = etapa_sms;
        if (data_envio) where.data_envio = data_envio;
        if (validade_contrato) where.validade_contrato = validade_contrato;
        if (tipo_banco) where.tipo_banco = tipo_banco;

        if (tipo_usuario === 'PARCEIRO') {

            if (perfil === 'MATRIZ') {

                const idsParceiros = await acesso_completo.findAll({

                    attributes: ['id_acesso'],

                    where: {
                        cnpj_matriz
                    }
                });

                if (idsParceiros) {

                    var parceiros = [];

                    idsParceiros.forEach(element => {
                        parceiros.push(element.id_acesso)
                    });
                }


                where.id_acesso = parceiros;


                const propstasMatriz = await vw_proposta.findAll({

                    where
                })

                res.send(propstasMatriz)
            }

            if (perfil === 'SUB ACESSO') {

                where.id_acesso = id_acesso

                try {

                    const parceiroSubAcesso = await vw_proposta.findAll({

                        where
                    })

                    return res.status(200).send(parceiroSubAcesso)


                } catch (error) {

                    return res.status(500).send(error)
                }

            }
        }


        switch (tipo_usuario) {

            case "SUPERVISOR":
                const idsDoSupervisor = await acesso_completo.findAll({

                    attributes: ['id_acesso'],
                    where: {

                        supervisor: nome
                    }
                })

                if (idsDoSupervisor) {

                    var idssup = [];
                    idsDoSupervisor.forEach(element => {
                        idssup.push(element.id_acesso)
                    });

                }

                where.id_acesso = idssup;

                const propstasSup = await vw_proposta.findAll({
                    where
                });

                res.status(200).send(propstasSup);
                break;

            case "GERENTE":

                const idsDoGerente = await acesso_completo.findAll({

                    attributes: ['id_acesso'],
                    where: {

                        gerente: nome
                    }
                })

                if (idsDoGerente) {

                    var idsger = [];
                    idsDoGerente.forEach(element => {
                        idsger.push(element.id_acesso)
                    });

                }

                where.id_acesso = idsger;

                const propstasGer = await vw_proposta.findAll({
                    where
                });

                res.status(200).send(propstasGer);
                break;

            case "SUPERINTENDENTE":

                const idsDoSuperintendente = await acesso_completo.findAll({

                    attributes: ['id_acesso'],
                    where: {

                        superintendente: nome
                    }
                })

                if (idsDoSuperintendente) {

                    var idssuper = [];
                    idsDoSuperintendente.forEach(element => {
                        idsuper.push(element.id_acesso)
                    });

                }

                where.id_acesso = idssuper;

                const propostasSuper = await vw_proposta.findAll({
                    where
                });

                res.status(200).send(propostasSuper);
                break;

            case "ADM":

                const propostasAdm = await vw_proposta.findAll({
                    where
                });

                res.status(200).send(propostasAdm);
                break;

            default:
                res.send("tipo usuario não aceito")
        }
    },

    AtualizarProposta: async (req, res) => {
        const {
            codigo,
            parceiro,
            id_acesso,
            supervisor,
            gerente,
            tipo_parceiro,
            proposta,
            data_envio,
            banco,
            status,
            produto,
            tipo,
            entregue,
            valor_troco,
            convenio,
            banco_port1,
            numero_portabilidade,
            parcela,
            seguro,
            qtdp_pagaport1,
            nome,
            cpf,
            telefone_ddd_1,
            telefone1,
            correntista,
            telefone4,
            matricula,
            agendamento,
            dia,
            horario,
            exercito,
            senha_exercito,
            sexo,
            data_nascimento,
            email_cliente,
            uf,
            observacao,
            responsavel,
            data_atualizacao

        } = req.body;

        try {
            const existsProposta = await propostas.findOne({
                where: {
                    codigo
                }
            })

            if (!existsProposta) {
                return res.status(401).json({
                    message: "Proposta não encontrada"
                })
            }

            existsProposta.parceiro = parceiro;
            existsProposta.id_acesso = id_acesso;
            existsProposta.supervisor = supervisor;
            existsProposta.gerente = gerente;
            existsProposta.tipo_parceiro = tipo_parceiro;
            existsProposta.proposta = proposta;
            existsProposta.data_envio = data_envio;
            existsProposta.banco = banco;
            existsProposta.status = status;
            existsProposta.produto = produto;
            existsProposta.tipo = tipo;
            existsProposta.entregue = entregue;
            existsProposta.valor_troco = valor_troco;
            existsProposta.convenio = convenio;
            existsProposta.banco_port1 = banco_port1;
            existsProposta.numero_portabilidade = numero_portabilidade;
            existsProposta.parcela = parcela;
            existsProposta.seguro = seguro;
            existsProposta.qtdp_pagaport1 = qtdp_pagaport1;
            existsProposta.nome = nome;
            existsProposta.cpf = cpf;
            existsProposta.telefone_ddd_1 = telefone_ddd_1;
            existsProposta.telefone1 = telefone1;
            existsProposta.correntista = correntista;
            existsProposta.telefone4 = telefone4;
            existsProposta.matricula = matricula;
            existsProposta.agendamento = agendamento;
            existsProposta.dia = dia;
            existsProposta.horario = horario;
            existsProposta.exercito = exercito;
            existsProposta.senha_exercito = senha_exercito;
            existsProposta.sexo = sexo;
            existsProposta.data_nascimento = data_nascimento;
            existsProposta.email_cliente = email_cliente;
            existsProposta.uf = uf;
            existsProposta.observacao = observacao;
            existsProposta.responsavel = responsavel;
            existsProposta.data_atualizacao = data_atualizacao;

            existsProposta.save();
            return res.status(200).json(existsProposta);


        } catch (error) {
            console.log(error)
        }




    },

    FiltroPropostaIdentificacao: async (req, res) => {
        const {
            id_acesso,
            cnpj_matriz,
            perfil,
            tipo_usuario,
            nome,
            parceiro,
            proposta,
            tipo,
            cpf,
            mes,
            data_envio,
            supervisor,
            gerente,
        } = req.body

        var where = {};

        if (parceiro) where.parceiro = {
            [Op.substring]: parceiro
        }
        if (proposta) where.proposta = proposta;
        // where.status = "AGUARDANDO DOCUMENTACAO";
        if (tipo) where.tipo = tipo;
        if (cpf) where.cpf = cpf;
        if (mes) where.mes = mes;
        if (supervisor) where.supervisor = supervisor;
        if (gerente) where.gerente = gerente;
        if (data_envio) where.data_envio = data_envio;

        // const propostasFiltro = await propostas.findOne({
        //     where: {proposta: proposta}
        // })

        // if(propostasFiltro) {
        //     res.json(propostasFiltro)
        // }

        if (tipo_usuario === 'PARCEIRO') {


            if (perfil === 'MATRIZ') {

                const idsParceiros = await acesso_completo.findAll({

                    attributes: ['id_acesso'],

                    where: {
                        cnpj_matriz
                    }
                });

                if (idsParceiros) {

                    var parceiros = [];

                    idsParceiros.forEach(element => {
                        parceiros.push(element.id_acesso)
                    });
                }


                where.id_acesso = parceiros;


                const propstasMatriz = await vw_proposta.findAll({

                    where
                })

                res.send(propstasMatriz)
            }

            if (perfil === 'SUB ACESSO') {

                where.id_acesso = id_acesso

                try {

                    const parceiroSubAcesso = await vw_proposta.findAll({

                        where
                    })

                    return res.status(200).send(parceiroSubAcesso)


                } catch (error) {

                    return res.status(500).send(error)
                }

            }
        }


        switch (tipo_usuario) {

            case "SUPERVISOR":
                const idsDoSupervisor = await acesso_completo.findAll({

                    attributes: ['id_acesso'],
                    where: {

                        supervisor: nome
                    }
                })

                if (idsDoSupervisor) {

                    var idssup = [];
                    idsDoSupervisor.forEach(element => {
                        idssup.push(element.id_acesso)
                    });

                }

                where.id_acesso = idssup;

                const propstasSup = await vw_proposta.findAll({
                    where
                });

                res.status(200).send(propstasSup);
                break;

            case "GERENTE":

                const idsDoGerente = await acesso_completo.findAll({

                    attributes: ['id_acesso'],
                    where: {

                        gerente: nome
                    }
                })

                if (idsDoGerente) {

                    var idsger = [];
                    idsDoGerente.forEach(element => {
                        idsger.push(element.id_acesso)
                    });

                }

                where.id_acesso = idsger;

                const propstasGer = await vw_proposta.findAll({
                    where
                });

                res.status(200).send(propstasGer);
                break;

            case "SUPERINTENDENTE":

                const idsDoSuperintendente = await acesso_completo.findAll({

                    attributes: ['id_acesso'],
                    where: {

                        superintendente: nome
                    }
                })

                if (idsDoSuperintendente) {

                    var idssuper = [];
                    idsDoSuperintendente.forEach(element => {
                        idsuper.push(element.id_acesso)
                    });

                }

                where.id_acesso = idssuper;

                const propostasSuper = await vw_proposta.findAll({
                    where
                });

                res.status(200).send(propostasSuper);
                break;

            case "ADM":

                const propostasAdm = await vw_proposta.findAll({
                    where
                });

                res.status(200).send(propostasAdm);
                break;

            default:
                // res.send("tipo usuario não aceito")
        }
    },

    CreateProposta: async (req, res) => {
        // const{ originalname: name,si}
        console.log(req.body)

        const {
            parceiro,
            id_acesso,
            supervisor,
            gerente,
            tipo_parceiro,
            proposta,
            data_envio,
            banco,
            status,
            produto,
            tipo,
            entregue,
            valor_troco,
            convenio,
            banco_port1,
            numero_portabilidade,
            parcela,
            seguro,
            qtdp_pagaport1,
            nome,
            cpf,
            telefone_ddd_1,
            telefone1,
            correntista,
            telefone4,
            matricula,
            agendamento,
            dia,
            horario,
            exercito,
            senha_exercito,
            sexo,
            data_nascimento,
            email_cliente,
            uf,
            observacao,
            cpf_supervisor,
            cpf_gerente,
            cpf_parceiro,
            data_inclusao,

        } = req.body;

        const creatdProposta = await propostas.create({
            parceiro,
            id_acesso,
            supervisor,
            gerente,
            tipo_parceiro,
            proposta,
            data_envio,
            banco,
            status,
            produto,
            tipo,
            entregue,
            valor_troco,
            convenio,
            banco_port1,
            numero_portabilidade,
            parcela,
            seguro,
            qtdp_pagaport1,
            nome,
            cpf,
            telefone_ddd_1,
            telefone1,
            correntista,
            telefone4,
            matricula,
            agendamento,
            dia,
            horario,
            exercito,
            senha_exercito,
            sexo,
            data_nascimento,
            email_cliente,
            uf,
            observacao,
            cpf_supervisor,
            cpf_gerente,
            cpf_parceiro,
            data_inclusao
        })
        if (creatdProposta)
            res.send(creatdProposta)
    },

    PropostaIdentificacaoCreate: async (req, res) => {
        const {
            proposta,
            data_envio,
            mes,
            status,
            entregue,
            banco_origi,
            produto,
            tipo,
            cpf,
            nome,
            parceiro,
            supervisor,
            gerente,
            id_acesso,
            cpf_parceiro,
            cpf_supervisor,
            cpf_gerente,
            data_inclusao
        } = req.body

        const propostaAlreadyExists = await propostas.findOne({
            where: {
                proposta
            }
        })

        if (!propostaAlreadyExists) {
            const createIdentificacaoProposta = await propostas.create({
                proposta,
                data_envio,
                mes,
                status,
                entregue,
                banco_origi,
                produto,
                tipo,
                cpf,
                nome,
                parceiro,
                supervisor,
                gerente,
                cpf_parceiro,
                cpf_supervisor,
                cpf_gerente,
                data_inclusao,
                id_acesso
            })

            return res.status(201).json(createIdentificacaoProposta);
        }
        return res.send({
            resp: "Proposta já existente"
        })
    },

    PropostaIdentificacaoModal: async (req, res) => {
        const codigo = req.body

        const dataPropostaIdentificacao = await propostas.findOne({
            where: codigo
        })

        return res.status(201).json(dataPropostaIdentificacao)
    },

    PropostaArquivos: async (req, res) => {

        const {
            codigo
        } = req.query;
        var {
            proposta,
            identificacao,
            endereco,
            renda,
            extratoInss,
            outros1,
            outros2,
            outros3,
            outros4
        } = req.files;

        (proposta) ? proposta = req.files.proposta[0].originalname: proposta = null;
        (identificacao) ? identificacao = req.files.identificacao[0].originalname: identificacao = null;
        (endereco) ? endereco = req.files.endereco[0].originalname: endereco = null;
        (renda) ? renda = req.files.renda[0].originalname: endereco = null;
        (extratoInss) ? extratoInss = req.files.extratoInss[0].originalname: extratoInss = null;
        (outros1) ? outros1 = req.files.outros1[0].originalname: outros1 = null;
        (outros2) ? outros2 = req.files.outros2[0].originalname: outros2 = null;
        (outros3) ? outros3 = req.files.outros3[0].originalname: outros3 = null;
        (outros4) ? outros4 = req.files.outros4[0].originalname: outros = null;

        try {
            const arquivo = await propostas.findOne({
                where: {
                    codigo
                }
            });

          

            arquivo.arquivo1 = proposta;
            arquivo.arquivo2 = identificacao;
            arquivo.arquivo3 = endereco;
            arquivo.arquivo4 = renda;
            arquivo.arquivo5 = extratoInss;
            arquivo.arquivo6 = outros1;
            arquivo.arquivo7 = outros2;
            arquivo.arquivo8 = outros3;
            arquivo.arquivo9 = outros4;

            arquivo.save();
            return res.send(arquivo);

        } catch (error) {
            console.log(error)
        }
    },

    UpdateIdentificacaoPropostaFiles: async (req, res) => {
        const {
            codigo,
        } = req.query;

        var {
            proposta,
            identificacao,
            endereco,
            renda,
            outros1,
            outros2,
            outros3,
            outros4,
            gravacao
        } = req.files;

        (proposta) ? proposta = req.files.proposta[0].originalname: proposta = null;
        (identificacao) ? identificacao = req.files.identificacao[0].originalname: identificacao = null;
        (endereco) ? endereco = req.files.endereco[0].originalname: endereco = null;
        (renda) ? renda = req.files.renda[0].originalname: renda = null;
        (outros1) ? outros1 = req.files.outros1[0].originalname: outros1 = null;
        (outros2) ? outros2 = req.files.outros2[0].originalname: outros2 = null;
        (outros3) ? outros3 = req.files.outros3[0].originalname: outros3 = null;
        (outros4) ? outros4 = req.files.outros4[0].originalname: outros4 = null;
        (gravacao) ? gravacao = req.files.gravacao[0].originalname: gravacao = null;

        try {

            const arquivo = await propostas.findOne({
                where: {
                    codigo: codigo
                }
            })


            arquivo.arquivo1 = proposta;
            arquivo.arquivo2 = identificacao;
            arquivo.arquivo3 = endereco;
            arquivo.arquivo4 = renda;

            arquivo.arquivo6 = outros1;
            arquivo.arquivo7 = outros2;
            arquivo.arquivo8 = outros3;
            arquivo.arquivo9 = outros4;
            arquivo.arquivo10 = gravacao;

            arquivo.save()
            res.send(arquivo)

        } catch (error) {
            console.log(error);
        }

    },

    UpdateIdentificacaoPropostaCampos: async (req, res) => {
        const {
            codigo,
            nome,
            telefone_ddd_1,
            telefone,
            correntista,
            telefone_confirmacao,
            sistema_tel,
            exercito,
            senha_exercito,
            sexo,
            email,
            data_nascimento,
            endereco_uf_comercial,
            cpf,
            observacao,
            responsavel,
            data_atualizacao
        } = req.body

        const proposta = await propostas.findOne({
            where: {
                codigo: codigo
            }
        })

        if (proposta) {
            proposta.nome = nome,
                proposta.telefone_ddd_1 = telefone_ddd_1,
                proposta.telefone = telefone,
                proposta.correntista = correntista,
                proposta.telefone_confirmacao = telefone_confirmacao,
                proposta.sistema_tel = sistema_tel,
                proposta.exercito = exercito,
                proposta.senha_exercito = senha_exercito,
                proposta.sexo = sexo,
                proposta.email = email,
                proposta.data_nascimento = data_nascimento,
                proposta.endereco_uf_comercial = endereco_uf_comercial,
                proposta.cpf = cpf,
                proposta.observacao = observacao,
                proposta.responsavel = responsavel,
                proposta.data_atualizacao = data_atualizacao

            proposta.save()
            res.status(201).json(proposta)
        }

        return res.send("Proposta não identificada");

    },

}
module.exports = PropostaController;