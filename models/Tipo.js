module.exports = (sequelize, DataTypes) => {
    const Tipo = sequelize.define('tipo', {
        id_tipo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        tipo:DataTypes.STRING,
        sigla:DataTypes.STRING
    }, {
        tableName: 'tipo',
        timestamps: false
    })
    return Tipo;
};
