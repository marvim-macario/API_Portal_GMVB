const Acesso =(userPerfil,userCpf,userTipousuario,userNome,userCnpjMatriz) =>{
    var where = {};
    // if(userTipousuario ==='PARCEIRO'&& userPerfil==='MATRIZ' || userTipousuario ==='PARCEIRO'&& userPerfil==='SUB ACESSO') where.cpf = userCpf;
    // if(userTipousuario ==='SUPERVISOR') where.supervisor = userNome;
    // if(userTipousuario ==='GERENTE') where.gerente = userNome;
    
    if(userTipousuario ==='PARCEIRO'&& userPerfil==='MATRIZ' ) where.cnpj = userCnpjMatriz
    if(userTipousuario ==='PARCEIRO'&& userPerfil==='SUB ACESSO') where.cpf = userCpf
    if(userTipousuario ==='SUPERVISOR') where.supervisor = userNome;
    if(userTipousuario ==='GERENTE') where.gerente = userNome;

    return where;
}

module.exports = Acesso