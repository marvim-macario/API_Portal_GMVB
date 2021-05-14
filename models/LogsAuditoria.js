module.exports = (sequelize, DataTypes) => {
    const LogsAuditoria = sequelize.define('logs_auditoria',{
        id_log: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },

        proposta: DataTypes.STRING,
        data_log: DataTypes.STRING,
        campo: DataTypes.STRING,
        valor_velho: DataTypes.STRING,
        valor_novo: DataTypes.STRING,
        usuario: DataTypes.STRING,
        id_proposta: DataTypes.STRING
    }, {
        tableName: "logs_auditoria",
        timestamps: false
    })

    return LogsAuditoria;
}