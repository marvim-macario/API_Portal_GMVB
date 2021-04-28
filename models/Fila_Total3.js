module.exports = (sequelize, DataTypes) => {
    const Fila_Total3 = sequelize.define('fila_total3', {
        status: DataTypes.STRING,
        qtd: DataTypes.INTEGER,
        valor: DataTypes.STRING,
        qtd_fora: DataTypes.DECIMAL,
        qtd_dentro: DataTypes.DECIMAL,
        data_atualizacao: DataTypes.STRING
    }, {
        tableName: 'fila_total3',
        timestamps: false
    })

    Fila_Total3.removeAttribute('id');
    return Fila_Total3;
}