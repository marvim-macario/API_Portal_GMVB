module.exports = (sequelize, DataTypes) => {
    const Relatorio_pendencias = sequelize.define('relatorio_pendencia', {
        data_log: DataTypes.STRING,
        status: DataTypes.STRING,
        sub_status: DataTypes.STRING,
        proposta: DataTypes.STRING,
        parceiro: DataTypes.STRING,
        supervisor: DataTypes.STRING,
        gerente: DataTypes.STRING,
        banco_origi: DataTypes.STRING,
        tipo: DataTypes.STRING,
        produto: DataTypes.STRING,
        codigo: DataTypes.INTEGER,
        observacao: DataTypes.STRING,
        status_atual: DataTypes.STRING,
        cpf: DataTypes.STRING,
        mes: DataTypes.STRING
    }, {
        tableName: 'relatorio_pendencia',
        timestamps: false
    })

    Relatorio_pendencias.removeAttribute('id');
    return Relatorio_pendencias;
}