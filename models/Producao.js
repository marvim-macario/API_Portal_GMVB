module.exports = (Sequelize, DataTypes) => {
    const Producao = Sequelize.define("producao", {
        id_producao: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            
        },

        promotor: DataTypes.STRING,
        digitado_novo: DataTypes.STRING,
        digitado_port: DataTypes.STRING,
        digitado_prev: DataTypes.STRING,
        integrado_novo: DataTypes.STRING,
        integrado_port: DataTypes.STRING,
        integrado_prev: DataTypes.STRING,
        ole_valor: DataTypes.STRING,
        ole_qtd: DataTypes.STRING,
        supervisor: DataTypes.STRING,
        data_cadastro: DataTypes.STRING,
        tipo: DataTypes.INTEGER,
        integrado_bb: DataTypes.STRING,
        digitado_bb: DataTypes.STRING,
        flag: DataTypes.STRING,
        mes: DataTypes.STRING
    }, {
        tableName: "producao",
        timestamps: false
    });

    return Producao;
}
