module.exports = (sequelize, DataTypes) => {
    const Fila_Regularizacao = sequelize.define('fila_regularizacao', {
        status: DataTypes.STRING,
        qtd: DataTypes.INTEGER,
        valor: DataTypes.STRING,
        qtd_fora: DataTypes.DECIMAL,
        qtd_dentro: DataTypes.DECIMAL,
        data_atualizacao: DataTypes.STRING
    },{
        tableName: 'fila_regularizacao',
        timestamps: false
    })

    Fila_Regularizacao.removeAttribute('id');
    return Fila_Regularizacao;
}