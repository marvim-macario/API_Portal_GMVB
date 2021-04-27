module.exports = (sequelize, DataTypes) => {
    const FilaDIgitacao = sequelize.define("fila_digitacao", {
        status: DataTypes.STRING,
        qtd: DataTypes.INTEGER,
        valor: DataTypes.STRING,
        qtd_fora: DataTypes.DECIMAL,
        qtd_dentro: DataTypes.DECIMAL,
        data_atualizacao: DataTypes.STRING
    },{
        tableName: "fila_digitacao",
        timestamps: false
    })

    FilaDIgitacao.removeAttribute('id');
    return FilaDIgitacao;
}