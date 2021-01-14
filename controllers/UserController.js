const { acesso_completo } = require('../models');
const mailer = require('../modules/mailer');
const crypto =  require('crypto');


const UserController = {
    //metodo de login 
    find: async (req,res) => {
        const {usuario, senha } = req.body;
        const user = await acesso_completo.findOne({  
        where : {
        usuario: usuario,
        senha: senha,
        }});

        if (!user)
            return res.status(400).send({erro:"usuario ou senha invalidos"});
        if(user.status !== 'ATIVO'){
            return res.status(401).send("usuario inativo")
        }
        
        res.status(200).send({ user });
    },

     //metodo de busca e envio de email de email para recuperar senha
     send: async (req,res) =>{
        
        const { email } = req.body;

        try{
            const user = await acesso_completo.findOne({ 
            where:{
                email
            } 
            });

        if(!user)
            return res.status(400).send({erro :"email de usuario não cadastrado."});


        
        const token = crypto.randomBytes(5).toString('hex');
        const now = new Date();
        now.setHours(now.getHours() + 1 );
        
        console.log(user);

        user.token = token;
        await user.save()


        mailer.sendMail({
            from: 'esteira.maisvalor@gmvb.com.br',
            to: email,
            subject: "Recuperar senha",
            html: `<h5>Esqueceu sua senha? não se preocupe, use esse token <h2>${ token }</h2>, para cadastrar uma nova senha</h5>`,
            context: token
            }, (err) => {
            if(err)
                return res.status(400).send({ erro: 'não foi possivel enviar o email' });
    
            return res.status(200).send({ sucesso:'email enviado com sucesso'});
            })
    
    }catch (err){
        console.log(err);
        return res.status(400).send({erro:"não foi possivel enviar o email, tente novamente."});
    }
    },

    //metodo para alterar senha 
    update: async(req, res) => {
        try{
            const { token, novaSenha } = req.body;
            const user = await acesso_completo.findOne({
                where:{
                    token
                }  });
            if(!user)
                return res.status(400).send({ erro:"usuario não encontrado"});

            user.senha = novaSenha;

            await user.save()
                res.status(200).send({ sucesso: "senha alterada com sucesso" });
        }catch(err){
            res.status(400).send({ erro:"não foi possivel alterar a senha, tente novamente."});
        }
    }
}

module.exports = UserController