module.exports = (sequelize, DataTypes) => {
    const Banco = sequelize.define('banco', {
        id_banco: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        banco:DataTypes.STRING,
    }, {
        tableName: 'banco',
        timestamps: false
    })
    return Banco;
};