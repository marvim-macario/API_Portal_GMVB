module.exports = (sequelize, DataTypes) => {
    const UsuarioMes2 = sequelize.define('usuario_mes2', {
        usuario: DataTypes.STRING,
        nivel: DataTypes.STRING,
        supervisor: DataTypes.STRING,
        OUTUBRO: DataTypes.DECIMAL(23, 0),
        NOVEMBRO: DataTypes.DECIMAL(23, 0),
        DEZEMBRO: DataTypes.DECIMAL(23, 0),
        codigo: DataTypes.STRING
    }, {
        tableName: "usuario_mes2",
        timestamps: false
    });

    UsuarioMes2.removeAttribute('id');

    return UsuarioMes2;
}