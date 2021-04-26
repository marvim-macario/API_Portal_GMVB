module.exports = (sequelize, DataTypes) => {
    const Fila_Pendencia = sequelize.define('fila_pendencia', {
        status: DataTypes.STRING,
        qtd: DataTypes.INTEGER,
        valor: DataTypes.STRING,
        qtd_fora: DataTypes.DECIMAL,
        qtd_dentro: DataTypes.DECIMAL,
        data_atualizacao: DataTypes.STRING
    }, {
        tableName: 'fila_pendencia',
        timestamps: false
    })

    return Fila_Pendencia;
}