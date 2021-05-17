module.exports = (sequelize, DataTypes) => {
    const SetorUsuario2 = sequelize.define("setor_usuario2", {
        usuario: DataTypes.STRING,
        nivel: DataTypes.STRING,
        supervisor: DataTypes.STRING,
        codigo: DataTypes.STRING,
        QUANTIDADE: DataTypes.INTEGER,
        MEDIA: DataTypes.DECIMAL(21,0),
        total: DataTypes.STRING
    }, {
        tableName: "setor_usuario2",
        timestamps: false
    });

    SetorUsuario2.removeAttribute('id');

    return SetorUsuario2;
}