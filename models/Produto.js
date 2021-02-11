module.exports = (sequelize, DataTypes) => {
    const Produto = sequelize.define('produto', {
        id_produto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        produto:DataTypes.STRING,
    }, {
        tableName: 'produto',
        timestamps: false
    })
    return Produto;
};