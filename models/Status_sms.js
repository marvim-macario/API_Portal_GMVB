module.exports = (sequelize, DataTypes) => {
    const status_sms = sequelize.define('status_sms', {
        id_log: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        codigo: DataTypes.STRING,
        status: DataTypes.STRING,
        sub_status: DataTypes.STRING,
        empresa_sms: DataTypes.STRING,
        proposta: DataTypes.STRING,
        responsavel: DataTypes.STRING,
        data_log: DataTypes.STRING,
        venda_sms: DataTypes.STRING,
        auditoria_sms: DataTypes.STRING,
        produto: DataTypes.STRING
    },{
        tableName: 'status_sms',
        timestamps: false 
    })
    return status_sms;
}
