module.exports = (sequelize, DataTypes) => {
    const Logs_imobiliario = sequelize.define('logs_imobiliario',{
        id_log: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        data_log: DataTypes.STRING,
        campo: DataTypes.STRING,
        valor_velho: DataTypes.STRING,
        valor_novo: DataTypes.STRING,
        usuario: DataTypes.STRING,
        proposta: DataTypes.STRING,
        codigo: DataTypes.STRING
    }, {
        tableName: 'logs_imobiliario',
        timestamps: false
    })

    return Logs_imobiliario;
}