module.exports = (sequelize, DataTypes) => {
    const Empresa = sequelize.define('empresa', {
        id_empresa: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        empresa:DataTypes.STRING,
    }, {
        tableName: 'empresa',
        timestamps: false
    })
    return Empresa;
};

