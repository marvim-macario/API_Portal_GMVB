const {
    saldo_devedor
} = require('../models/');
const {
    status_saldo
} = require('../models/');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const SaldoDevedorController = {

    SaldoDevedor: async (req, res) => {
        const {
            parceiro,
            status
        } = req.body;

        let consulta = {
            "parceiro": parceiro,
            "status": status
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

        if (!consulta)
            return res.status(400).send('não foi possivel consultar resultados!');


        clean(consulta);

        try {
            const person = await saldo_devedor.findAll({
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


        // const saldoDevedor1 = await saldo_devedor.findAll({
        //     attributes: ['codigo','convenio','cpf','matricula','saldo_devedor1','prazo_restante','taxa_juros','parceiro',
        //     'data_envio','responsavel','data_atualizacao','status','parcela','data_nascimento','renda','banco_origi','id_parceiro',
        //     'idt_margem'] 
        // });

        res.status(200).send(saldoDevedor1);
    },

    StatusSaldo: async (req, res) => {

        const StatusSaldo1 = await status_saldo.findAll({
            order: [
                ['status', 'DESC']
            ],
        });

        res.status(200).send(StatusSaldo1);
    },

    IncluirSaldo: async (req, res) => {
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

        const user = await saldo_devedor.findOne({
            where: {
                cpf
            }
        })

        if (user)
            return res.status(403).send("Não foi possível incluir saldo, já existente")


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

        return res.status(200).send(" Incluído com sucesso!");

    },

    AlterarSaldo: async (req, res) => {

        const {

            saldo_devedor1,
            prazo_restante,
            taxa_juros,
            responsavel,
            data_atualizacao,
            status,
            codigo

        } = req.body;

        const AlterarSaldo1 = await saldo_devedor.update({

            saldo_devedor1: saldo_devedor1,
            prazo_restante: prazo_restante,
            taxa_juros: taxa_juros,
            responsavel: responsavel,
            data_atualizacao: data_atualizacao,
            status: status

        }, {

            where: {

                codigo: codigo

            }

        });

        res.status(200).send("alterado com sucesso!");
    },

    Modal: async (req, res) => {
        try {

            const {
                cpf
            } = req.body;

            const dadosDeSaldo = await saldo_devedor.findOne({
                where: { cpf }
            })
            return res.status(200).send(dadosDeSaldo)

        } catch (error) {
            console.log(error)
            res.send(error);
        }

    }
}

module.exports = SaldoDevedorController;