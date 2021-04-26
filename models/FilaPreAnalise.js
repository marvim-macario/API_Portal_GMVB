module.exports = (sequelize, DataTypes) => {
    const FilaPreAnalise = sequelize.define("fila_preanalise", {
        status: DataTypes.STRING,
        qtd: DataTypes.INTEGER,
        valor: DataTypes.STRING,
        qtd_fora: DataTypes.DECIMAL,
        qtd_dentro: DataTypes.DECIMAL,
        data_atualizacao: DataTypes.STRING
    },{
        tableName: "fila_preanalise",
        timestamps: false
    })

    return FilaPreAnalise;
}