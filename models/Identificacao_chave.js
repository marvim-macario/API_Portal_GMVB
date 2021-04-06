module.exports = (sequelize, DataTypes) => {
    const Identificacao_Chave = sequelize.define('identificacao_chave', {
        chave: DataTypes.STRING,
        cnpj: DataTypes.STRING,
        parceiro: DataTypes.STRING,
        supervisor: DataTypes.STRING,
        gerente: DataTypes.STRING
    }, {
        tableName: 'identificacao_chave',
        timesTamps: false
    })
    return Identificacao_Chave
};