const {
    acesso_completo,
    acessos
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

        res.status(200).send({
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
                where: { email }
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

            },(err) => {
                if (err)
                    return res.status(400).send({
                        erro: 'não foi possivel enviar o email'
                });

                return res.status(200).send({
                    sucesso: 'email enviado com sucesso'
                });
            })

        }catch(err) {
            console.log(err);
            return res.status(400).send({
                erro: "não foi possivel enviar o email, tente novamente."
            });
        }
    },

    //metodo para alterar senha 
    update: async (req, res) => {
        try {
            const { token, novaSenha } = req.body;

            const user = await acesso_completo.findOne({

                where: { token }
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

        }catch (err) {
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
                cpf,
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


        let data_cadastro  =  new Date();

        try {
            
            const valid = await acessos.findOne({
                where:{
                    cpf,
                    nome
                }
            })
            if(valid)
                return res.status(403).send({erro:'usuario já tem acesso cadastrado'});
            
            const created = await acessos.create({
                    cnpj_matriz,
                    nome,
                    empresa,
                    perfil,
                    usuario,
                    senha,
                    responsavel,
                    cpf,
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
            })

            if(created)
                return res.status(201).send({sucesso:'acesso criado com sucesso'});
            
        }catch (error) {
                return res.status(500).send({erro:"não foi possivel cadastrar acesso tente novamente."})
                console.log(error)
        }
    },
    
}

module.exports = UserController