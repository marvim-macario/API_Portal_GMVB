module.exports = (sequelize, DataTypes) => {
    const Propostas_callcenter = sequelize.define('propostas_callcenter',{
        proposta: DataTypes.STRING,
        nome: DataTypes.STRING,
        cpf: DataTypes.STRING,
        supervisor: DataTypes.STRING,
        gerente: DataTypes.STRING,
        status: DataTypes.STRING,
        data_venda: DataTypes.STRING
    }, {
        tableName: 'propostas_callcenter',
        timestamps: false
    })

    return Propostas_callcenter;
}