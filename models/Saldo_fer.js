module.exports = (sequelize, DataTypes) => {
    const Saldo_fer = sequelize.define('saldo_fer', {
        codigo: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        convenio:DataTypes.STRING,
        cpf:DataTypes.STRING,
        matricula:DataTypes.STRING,
        saldo_devedor:DataTypes.STRING,
        prazo_restante:DataTypes.STRING,
        taxa_juros:DataTypes.STRING,
        parceiro:DataTypes.STRING,
        data_envio:DataTypes.STRING,
        responsavel:DataTypes.STRING,
        data_atualizacao:DataTypes.STRING,
        status:DataTypes.STRING,
        parcela:DataTypes.STRING,
        arquivo1:DataTypes.STRING,
        id_parceiro:DataTypes.STRING
    
    }, {
        tableName: 'saldo_fer',
        timestamps: false
    })
    return Saldo_fer
 
};