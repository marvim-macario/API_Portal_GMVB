const {
    propostas_bb,
    logs_auditoria
} = require('../models');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const PropostaBbController = {
    Venda: async (req, res) => {
        const result = await propostas_bb.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('tipo_operacao')), 'tipo_operacao']
            ],

            order: [
                ['tipo_operacao', 'DESC']
            ]
        });

        const resultOfFilter = result.filter(item => item.tipo_operacao !== null && item.tipo_operacao !== "");

        return res.json(resultOfFilter);
    },

    Operador: async (req, res) => {
        const result = await propostas_bb.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('usuario')), 'usuario']
            ],

            order: [
                ['usuario', 'DESC']
            ]
        })

        // console.log(result[result.length -1].usuario !== null);
        const resultOfFilter = result.filter(item => item.dataValues.usuario !== null && item.dataValues.usuario !== '');
        return res.json(resultOfFilter);
    },

    Tipo: async (req, res) => {
        const result = await propostas_bb.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('tipo')), 'tipo']
            ],

            order: [
                ['tipo', 'DESC']
            ]
        })

        const resultOfFilter = result.filter(item => item.tipo !== null && item.tipo !== "");

        return res.json(resultOfFilter);
    },

    Mes: async (req, res) => {
        const result = await propostas_bb.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('mes')), 'mes']
            ],

            order: [
                ['mes', 'DESC']
            ]
        });

        const resultOfFilter = result.filter(item => item.mes !== null && item.mes !== "");

        return res.json(resultOfFilter);
    },

    Supervisor: async (req, res) => {
        const Supervisor = await propostas_bb.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('supervisor')), 'supervisor']
            ],

            order: [
                ['supervisor', 'DESC']
            ]
        });
        res.status(200).send(Supervisor);
    },

    StatusAuditoria: async (req, res) => {
        const StatusAuditoria = await propostas_bb.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('status_auditoria')), 'status_auditoria']
            ],

            order: [
                ['status_auditoria', 'DESC']
            ]
        });

        const resultOfFilter = StatusAuditoria.filter((item) => item.status_auditoria !== null && item.status_auditoria !== "");

        res.status(200).send(resultOfFilter);
    },

    StatusProposta: async (req, res) => {
        const StatusProposta = await propostas_bb.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('status')), 'status']
            ],

            order: [
                ['status', 'DESC']
            ]
        });

        const resultOfFilter = StatusProposta.filter(({status}) => status !== null && status !== "");
        res.status(200).send(resultOfFilter);
    },

    Falta: async (req, res) => {
        const faltas = await propostas_bb.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('falta')), 'falta']
            ]
        })

        const resultOfFilter = faltas.filter((item) => item.falta !== null && item.falta !== "");

        return res.json(resultOfFilter)
    },

    SubStatus: async (req, res) => {
        const subStatus = await propostas_bb.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('sub_status')), 'sub_status']
            ]
        })

        const resultOfFilter = subStatus.filter((item) => item.sub_status !== null && item.sub_status !== "");

        return res.json(resultOfFilter);
    },

    TipoFalta: async (req, res) => {
        const TipoFalta = await propostas_bb.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('tipo_falta')), 'tipo_falta']
            ],
            order: [
                ['tipo_falta', 'DESC']
            ]
        })
        res.status(200).send(TipoFalta);
    },

    Filtro: async (req, res) => {
        try {
            let objFields = {
                ...req.body
            };

            console.log(objFields);

            for (let [key, value] of Object.entries(objFields)) {
                if (value === "" || value === undefined || value === null) {
                    delete objFields[key];
                }
            }

            console.log(objFields);

            if (Object.keys(objFields).length !== 0) {
                const result = await propostas_bb.findAll({
                    where: {
                        ...objFields
                    }
                });

                result.length === 0 ? res.json({
                    message: "nenhum registro encontrado com este filtro"
                }) : res.json(result);

            } else {
                return res.json({
                    message: "nenhum registro encontrado com este filtro"
                });
            }

        } catch (error) {
            console.error(error);
        }
    },

    Modal: async (req, res) => {
        try {

            const {
                id_proposta
            } = req.body;

            const dadosPropostaBb = await propostas_bb.findOne({
                where: {
                    id_proposta
                }
            })
            return res.status(200).send(dadosPropostaBb);
        } catch (error) {
            console.log(error)
            res.send(error);
        }
    },

    BuscarLogs: async (req, res) => {
        const id_proposta = req.body.id_proposta;

        const result = await logs_auditoria.findAll({
            where: {
                id_proposta
            }
        })

        return res.json(result);
    },

    Alterar: async (req, res) => {
        const {
            id_proposta,
            status_auditoria,
            falta,
            tipo_falta,
            sub_status,
            observacao,
            proposta,
            data_venda,
            mes,
            status,
            //Linha de credito
            valor_proposta,
            valor_troco,
            valor_liquido,
            qtd_parcela,
            valor_seguro,
            //Mailing origem
            valor_parcela,
            tipo_operacao,
            vencimento_parcela,
            convenio,
            nome,
            cpf,
            telefone_cliente,
            agencia_cliente,
            conta_cliente,
            parceiro,
            supervisor,
            gerente,
            cpf_parceiro,
            //Chave
            senha_chave,
            usuario,
            supervisor_parceiro,
            gerente_parceiro,
            chavej,
        } = req.body

        try {
            const BuscaPropostaBb = await propostas_bb.findOne({
                where: {
                    id_proposta
                }
            })

            if (!BuscaPropostaBb) {
                return res.send("Propostabb inexistente")
            }

            BuscaPropostaBb.status_auditoria = status_auditoria
            BuscaPropostaBb.falta = falta
            BuscaPropostaBb.tipo_falta = tipo_falta
            BuscaPropostaBb.sub_status = sub_status
            BuscaPropostaBb.observacao = observacao
            BuscaPropostaBb.proposta = proposta
            BuscaPropostaBb.data_venda = data_venda
            BuscaPropostaBb.mes = mes
            BuscaPropostaBb.status = status
            //Linha de credito
            BuscaPropostaBb.valor_proposta = valor_proposta
            BuscaPropostaBb.valor_troco = valor_troco
            BuscaPropostaBb.valor_liquido = valor_liquido
            BuscaPropostaBb.qtd_parcela = qtd_parcela
            BuscaPropostaBb.valor_seguro = valor_seguro
            //Mailing origem
            BuscaPropostaBb.valor_parcela = valor_parcela
            BuscaPropostaBb.tipo_operacao = tipo_operacao
            BuscaPropostaBb.vencimento_parcela = vencimento_parcela
            BuscaPropostaBb.convenio = convenio
            BuscaPropostaBb.nome = nome
            BuscaPropostaBb.cpf = cpf
            BuscaPropostaBb.telefone_cliente = telefone_cliente
            BuscaPropostaBb.agencia_cliente = agencia_cliente
            BuscaPropostaBb.conta_cliente = conta_cliente
            BuscaPropostaBb.parceiro = parceiro
            BuscaPropostaBb.supervisor = supervisor
            BuscaPropostaBb.gerente = gerente
            BuscaPropostaBb.cpf_parceiro = cpf_parceiro
            //Chave
            BuscaPropostaBb.senha_chave = senha_chave
            BuscaPropostaBb.usuario = usuario
            BuscaPropostaBb.supervisor_parceiro = supervisor_parceiro
            BuscaPropostaBb.gerente_parceiro = gerente_parceiro
            BuscaPropostaBb.chavej = chavej
            BuscaPropostaBb.save()
            return res.status(200).json(BuscaPropostaBb)
        } catch (error) {
            console.log(error)
        }
    },

    Falta: async (req, res) => {
        const faltas = await propostas_bb.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('falta')), 'falta']
            ]
        })

        const resultOfFilter = faltas.filter((item) => item.falta !== null && item.falta !== "");

        return res.json(resultOfFilter)
    },

    SubStatus: async (req, res) => {
        const subStatus = await propostas_bb.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('sub_status')), 'sub_status']
            ]
        })

        const resultOfFilter = subStatus.filter((item) => item.sub_status !== null && item.sub_status !== "");

        return res.json(resultOfFilter);
    },

    TipoFalta: async (req, res) => {
        const TipoFalta = await propostas_bb.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('tipo_falta')), 'tipo_falta']
            ],
            order: [
                ['tipo_falta', 'DESC']
            ]
        })

        const resultOfFilter = TipoFalta.filter((item) => item.tipo_falta !== null && item.tipo_falta !== "");
        res.status(200).send(resultOfFilter);
    },

    Incluir: async (req, res) => {
        const objFields = new Object(req.body);

        const result = await propostas_bb.create({
            ...objFields
        });

        return res.json(result);
    },

    BemReferencia: async (req, res) => {
        const limiteCredito = await propostas_bb.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('bem_referencia')), 'bem_referencia']
            ],
            order: [
                ['bem_referencia', 'DESC']
            ]
        });
        const resultOfFilter = limiteCredito.filter((item) => item.bem_referencia !== null && item.bem_referencia !== "");
        res.status(200).send(resultOfFilter);
    }

}

module.exports = PropostaBbController;