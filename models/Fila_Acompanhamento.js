module.exports = (sequelize, DataTypes) => {
    const Fila_Acompanhamento = sequelize.define('fila_acompanhamento', {
        status: DataTypes.STRING,
        qtd: DataTypes.INTEGER,
        valor: DataTypes.STRING,
        qtd_fora: DataTypes.DECIMAL,
        qtd_dentro: DataTypes.DECIMAL,
        data_atualizacao: DataTypes.STRING
    },{
        tableName: 'fila_acompanhamento',
        timestamps: false
    })

    Fila_Acompanhamento.removeAttribute('id');
    return Fila_Acompanhamento;
}