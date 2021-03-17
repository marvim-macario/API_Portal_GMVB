const {
    acesso_completo,
    acessos,
    cadastro
} = require('../models');

const mailer = require('../modules/mailer');
const crypto = require('crypto');



const UserController = {

    //metodo de login 
    Login: async (req, res) => {
        const {
            usuario,
            senha
        } = req.body;

        const user = await acesso_completo.findOne({

            where: {
                usuario: usuario,
                senha: senha
            }
        });

        if (!user)
            return res.status(400).send({
                erro: "usuario ou senha invalidos"
            });

        if (user.status !== 'ATIVO') {
            return res.status(401).send("usuario inativo")
        }

        return res.status(200).send({
            user
        });
    },

    //metodo de busca e envio de email de email para recuperar senha
    send: async (req, res) => {

        const {
            email
        } = req.body;

        try {
            const user = await acesso_completo.findOne({
                where: {
                    email
                }
            });

            if (!user)
                return res.status(400).send({
                    erro: "email de usuario não cadastrado."
                });

            const token = crypto.randomBytes(5).toString('hex');
            const now = new Date();
            now.setHours(now.getHours() + 1);

            user.token = token;
            await user.save()

            mailer.sendMail({
                from: 'esteira.maisvalor@gmvb.com.br',
                to: email,
                subject: "Recuperar senha",
                html: `<h5>Esqueceu sua senha? não se preocupe, use esse token <h2>${ token }</h2>, para cadastrar uma nova senha</h5>`,
                context: token

            }, (err) => {
                if (err)
                    return res.status(400).send({
                        erro: 'não foi possivel enviar o email'
                    });

                return res.status(200).send({
                    sucesso: 'email enviado com sucesso'
                });
            })

        } catch (err) {
            console.log(err);
            return res.status(400).send({
                erro: "não foi possivel enviar o email, tente novamente."
            });
        }
    },

    //metodo para alterar senha 
    update: async (req, res) => {
        try {
            const {
                token,
                novaSenha
            } = req.body;

            const user = await acesso_completo.findOne({

                where: {
                    token
                }
            });

            if (!user)
                return res.status(400).send({
                    erro: "usuario não encontrado"
                });

            user.senha = novaSenha;
            await user.save()

            res.status(200).send({
                sucesso: "senha alterada com sucesso"
            });

        } catch (err) {
            res.status(400).send({
                erro: "não foi possivel alterar a senha, tente novamente."
            });
        }
    },

    //metodo de inclusao de acesso no portal 
    Create: async (req, res) => {
        const {
            cnpj_matriz,
            nome,
            empresa,
            perfil,
            usuario,
            senha,
            responsavel,
            cpf_usuario,
            tipo_parceiro,
            usuario_master,
            classificacao,
            status,
            tipo_parceiro2,
            email,
            data_nascimento,
            data_atualizacao,
            foto,
            telefone,
            arquivo1,
            arquivo2,
            tipo,
            motivo_cancelamento,
            cetelem,
            f5_ole,
            f5_pan,
            f5_bmg,
            f5_orienta,
            f5_itau,
            f5_safra,
            ole,
            pan,
            sim,
            daycoval,
            safra,
            bradesco,
            parana,
            consorcio_bb,
            consorcio_itau,
            consorcio_caixa,
            crefisa,
            itau
        } = req.body;

        let data_cadastro = new Date();

        try {

            const valid = await acessos.findOne({
                where: {
                    cpf_usuario,
                    nome
                }
            })
            if (valid)
                return res.status(403).send({
                    erro: 'usuario já tem acesso cadastrado'
                });

            const created = await acessos.create({
                cnpj_matriz,
                nome,
                empresa,
                perfil,
                usuario,
                senha,
                responsavel,
                cpf_usuario,
                tipo_parceiro,
                usuario_master,
                classificacao,
                status,
                tipo_parceiro2,
                email,
                data_cadastro,
                data_nascimento,
                data_atualizacao,
                foto,
                telefone,
                arquivo1,
                arquivo2,
                tipo,
                motivo_cancelamento,
                cetelem,
                f5_ole,
                f5_pan,
                f5_bmg,
                f5_orienta,
                f5_itau,
                f5_safra,
                ole,
                pan,
                sim,
                daycoval,
                safra,
                bradesco,
                parana,
                consorcio_bb,
                consorcio_itau,
                consorcio_caixa,
                crefisa,
                itau,
            }, {
                isNewRecord: false

            });

            if (created)
                return res.status(201).send(created);

        } catch (error) {
            console.log(error)
            return res.status(500).send({
                erro: "não foi possivel cadastrar acesso tente novamente."
            })

        }
    },
    PreencherAcesso: async (req, res) => {
        const {
            id_acesso,
        } = req.body;
        try {
            const dadosDeAcesso = await acessos.findOne({
                where: {
                    id_acesso
                }

            })

            if (dadosDeAcesso)

                res.send(dadosDeAcesso);
        } catch (error) {
            console.log(error)
        }

    },

    //busca acessos cadastrados de acordo com o cnpj da matriz
    BuscarAcesso: async (req, res) => {

        const {
            cnpj_matriz
        } = req.body;

        try {
            const acessosCnpj = await acessos.findAll({

                where: {

                    cnpj_matriz
                }
            })
            if (acessosCnpj)
                res.status(200).send(acessosCnpj)

        } catch (error) {

            res.status(500).send({
                error
            })


        }

    },
    AlterarAceso: async (req, res) => {
        const {
            id_acesso,
            cnpj_matriz,
            nome,
            empresa,
            perfil,
            usuario,
            senha,
            responsavel,
            cpf_usuario,
            tipo_parceiro,
            usuario_master,
            classificacao,
            status,
            tipo_parceiro2,
            email,
            data_nascimento,
            data_atualizacao,
            foto,
            telefone,
            arquivo1,
            arquivo2,
            tipo,
            motivo_cancelamento,
            cetelem,
            f5_ole,
            f5_pan,
            f5_bmg,
            f5_orienta,
            f5_itau,
            f5_safra,
            ole,
            pan,
            sim,
            daycoval,
            safra,
            bradesco,
            parana,
            consorcio_bb,
            consorcio_itau,
            consorcio_caixa,
            crefisa,
            itau
        } = req.body

        const user = await acessos.findOne({
            where: {
                id_acesso
            }
        })
        if (!user)
            return res.status(400).send("não foi possivel encontrar usuario")


        user.cnpj_matriz = cnpj_matriz;
        user.nome = nome;
        user.empresa = empresa;
        user.perfil = perfil;
        user.usuario = usuario;
        user.senha = senha;
        user.responsavel = responsavel;
        user.cpf_usuario = cpf_usuario;
        user.tipo_parceiro = tipo_parceiro;
        user.usuario_master = usuario_master;
        user.classificacao = classificacao;
        user.status = status;
        user.tipo_parceiro2 = tipo_parceiro2;
        user.email = email;
        user.data_nascimento = data_nascimento
        user.data_atualizacao = data_atualizacao
        user.foto = foto;
        user.telefone = telefone;
        user.arquivo1 = arquivo1
        user.arquivo2 = arquivo2
        user.tipo = tipo;
        user.motivo_cancelamento = motivo_cancelamento
        user.cetelem = cetelem;
        user.f5_ole = f5_ole;
        user.f5_pan = f5_pan;
        user.f5_bmg = f5_bmg;
        user.f5_orienta = f5_orienta;
        user.f5_itau = f5_itau;
        user.f5_safra = f5_safra
        user.ole = ole;
        user.pan = pan;
        user.sim = sim;
        user.daycoval = daycoval;
        user.safra = safra;
        user.bradesco = bradesco;
        user.parana = parana;
        user.consorcio_bb = consorcio_bb;
        user.consorcio_itau = consorcio_itau;
        user.consorcio_caixa = consorcio_caixa;
        user.crefisa = crefisa;
        user.itau = itau;


        user.save()
        res.send("o acesso foi alterado com sucesso")

    },

    BuscaCpf: async (req, res) => {
        const {
            supervisor,
            gerente
        } = req.body;

        const supervisorBuscaCpf = await cadastro.findOne({
            where: {
                parceiro: supervisor
            }
        })

        const gerenteBuscaCpf = await cadastro.findOne({
            where: {
                parceiro: gerente
            }
        })

        if (supervisorBuscaCpf && gerenteBuscaCpf) {
            return res.status(200).json({
                supervisor_cpf: supervisorBuscaCpf.cnpj,
                gerente_cpf: gerenteBuscaCpf.cnpj
            })
        }

        return res.status(400).json({
            message: "Supervisor ou Gerente não existem"
        })

    }

}

module.exports = UserController