
const { acesso_completo,acessos,vw_proposta,proposta_comissao  } = require('../models');


const HomeController = {
    
    Grafico: async(req, res)=>{
        const { userNome, id_acesso, userTipousuario, userCnpjMatriz, userPerfil,mes } = req.body;

        where = {mes};
        if(userTipousuario ==='PARCEIRO'&& userPerfil==='MATRIZ' ) where.cnpj = userCnpjMatriz
        if(userTipousuario ==='PARCEIRO'&& userPerfil==='SUB ACESSO') where.cpf = userCpf
        if(userTipousuario ==='SUPERVISOR') where.supervisor = userNome;
        if(userTipousuario ==='GERENTE') where.gerente = userNome;
        if(userTipousuario ==='SUPERINTENDENTE') where.gerente = userNome;

        try {
            
      
            const pesquisaCount = await proposta_comissao.findAndCountAll({
                   
                    where
            })
            
            res.status(200).json({'count':pesquisaCount.count,data:mes})
    
        } catch (error) {
                console.log(error)
        }
      

        
    }

}
module.exports = HomeController;