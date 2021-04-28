module.exports = (sequelize, DataTypes) => {
    const Fila_Portabilidade = sequelize.define('fila_portabilidade', {
        status: DataTypes.STRING,
        qtd: DataTypes.INTEGER,
        valor: DataTypes.STRING,
        qtd_fora: DataTypes.DECIMAL,
        qtd_dentro: DataTypes.DECIMAL,
        data_atualizacao: DataTypes.STRING
    }, {
        tableName: 'fila_portabilidade',
        timestamps: false
    })

    Fila_Portabilidade.removeAttribute('id');
    return Fila_Portabilidade;
}