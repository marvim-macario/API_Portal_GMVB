module.exports = (sequelize, DataTypes) => {
    const FilaConfirmacao = sequelize.define("fila_confirmacao", {
        status: DataTypes.STRING,
        qtd: DataTypes.INTEGER,
        valor: DataTypes.STRING,
        qtd_fora: DataTypes.DECIMAL,
        qtd_dentro: DataTypes.DECIMAL,
        data_atualizacao: DataTypes.STRING
    },{
        tableName: "fila_confirmacao",
        timestamps: false
    })

    FilaConfirmacao.removeAttribute('id');
    return FilaConfirmacao;
}