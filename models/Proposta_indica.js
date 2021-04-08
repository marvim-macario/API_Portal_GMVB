module.exports = (sequelize, DataTypes) => {
    const Proposta_indica = sequelize.define('propostas_indica',{
        proposta: DataTypes.STRING,
        nome: DataTypes.STRING,
        cpf: DataTypes.STRING,
        supervisor: DataTypes.STRING,
        gerente: DataTypes.STRING,
        status: DataTypes.STRING,
        data_venda: DataTypes.STRING,
        cpf_correio: DataTypes.STRING,
        parceiro_correto: DataTypes.STRING,
        sup: DataTypes.STRING,
        ger: DataTypes.STRING
    },{
        tableName: 'propostas_indica',
        timesTamps: false
    })
    return Proposta_indica
}