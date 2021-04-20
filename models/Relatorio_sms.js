module.exports = (sequelize, DataTypes) => {
    const Relatorio_sms = sequelize.define('relatorio_sms', {
        codigo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        proposta: DataTypes.STRING, 
        status: DataTypes.STRING,
        tipo: DataTypes.STRING, 
        data_log: DataTypes.STRING,
        status_atual: DataTypes.STRING, 
        mes: DataTypes.STRING, 
        observacao: DataTypes.STRING, 
        produto: DataTypes.STRING, 
        usuario: DataTypes.STRING, 
        venda_sms: DataTypes.STRING, 
        auditoria_sms: DataTypes.STRING, 
        entregue: DataTypes.STRING, 
        cpf: DataTypes.STRING
    }, {
        tableName: 'relatorio_sms',
        timestamps: false
    })
    return Relatorio_sms;
}