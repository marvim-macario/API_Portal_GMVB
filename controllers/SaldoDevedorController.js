const {saldo_devedor } = require('../models/');
const {status_saldo } = require('../models/');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const SaldoDevedorController = {

    SaldoDevedor: async (req, res ) => {

        const saldoDevedor1 = await saldo_devedor.findAll({
            attributes: ['codigo','convenio','cpf','matricula','saldo_devedor1','prazo_restante','taxa_juros','parceiro',
            'data_envio','responsavel','data_atualizacao','status','parcela','data_nascimento','renda','banco_origi','id_parceiro',
            'idt_margem'] 
        });

        res.status(200).send(saldoDevedor1);
    },

    StatusSaldo: async (req, res ) => {

        const StatusSaldo1 = await status_saldo.findAll({
            order: [
                ['status', 'DESC']
            ],
        });

        res.status(200).send(StatusSaldo1);
    },

    IncluirSaldo: async (req, res ) => {
        const {
            convenio,
            cpf,
            matricula,
            saldo_devedor1,
            prazo_restante,
            taxa_juros,
            parceiro,
            data_envio,
            responsavel,
            data_atualizacao,
            status,
            parcela,
            data_nascimento,
            renda,
            banco_origi,
            id_parceiro,
            idt_margem
        } = req.body;


        const IncluirSaldo1 = await saldo_devedor.create({ 
            convenio: convenio,
            cpf: cpf,
            matricula: matricula,
            saldo_devedor1: saldo_devedor1,
            prazo_restante: prazo_restante,
            taxa_juros: taxa_juros,
            parceiro: parceiro,
            data_envio: data_envio,
            responsavel: responsavel,
            data_atualizacao: data_atualizacao,
            status: status,
            parcela: parcela,
            data_nascimento: data_nascimento,
            renda: renda,
            banco_origi: banco_origi,
            id_parceiro: id_parceiro,
            idt_margem: idt_margem
        });
        
        res.status(200).send(" Incluído com sucesso!");
     
    },

    AlterarSaldo: async (req, res ) => {

        const {

            saldo_devedor1,
            prazo_restante,
            taxa_juros,
            responsavel,
            data_atualizacao,
            status

        } = req.body;

        const AlterarSaldo1 =   await saldo_devedor.update({

            saldo_devedor1: saldo_devedor1,
            prazo_restante: prazo_restante,
            taxa_juros: taxa_juros,
            responsavel: responsavel,
            data_atualizacao: data_atualizacao,
            status: status

            }, {

            where: {

              codigo: 5585

            }

          });

          res.status(200).send("alterado com sucesso!");
    }
}

module.exports = SaldoDevedorController;