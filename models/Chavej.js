module.exports = (sequelize, DataTypes) => {
    const chavej = sequelize.define('base_chave', {
        id_chave: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        chave:DataTypes.STRING,
        empresa:DataTypes.STRING, 
        cpf_usuario:DataTypes.STRING, 
        usuario:DataTypes.STRING, 
        funcao:DataTypes.STRING, 
        cnpj:DataTypes.STRING, 
        status:DataTypes.STRING, 
        senha:DataTypes.STRING, 
        login:DataTypes.STRING, 
        data_cadastro:DataTypes.DATE,
        responsavel:DataTypes.STRING, 
        data_envio:DataTypes.STRING, 
        rg:DataTypes.STRING, 
        data_nascimento:DataTypes.STRING, 
        data_alteracao:DataTypes.STRING,
        tipo_chave:DataTypes.STRING, 
        obs:DataTypes.STRING,
        certificacao:DataTypes.STRING, 
        data_validade:DataTypes.STRING, 
        agencia_vinculo:DataTypes.STRING,
        data_inativacao:DataTypes.STRING,
        quem_inativou:DataTypes.STRING,
        motivo_cancelamento:DataTypes.STRING, 
        data_bloqueio:DataTypes.STRING
    }, {
        tableName: 'base_chave',
        timestamps: false
    })
    return chavej;
};