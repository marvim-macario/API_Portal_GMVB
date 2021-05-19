module.exports = (sequelize, DataTypes) => {
    const Usuario_dia2 = sequelize.define('usuario_dia2', {
        usuario: DataTypes.STRING,
        nivel: DataTypes.STRING,
        supervisor: DataTypes.STRING,
        "01": DataTypes.INTEGER,
        "02": DataTypes.INTEGER,
        "03": DataTypes.INTEGER,
        "04": DataTypes.INTEGER,
        "05": DataTypes.INTEGER,
        "06": DataTypes.INTEGER,
        "07": DataTypes.INTEGER,
        "08": DataTypes.INTEGER,
        "09": DataTypes.INTEGER,
        10: DataTypes.INTEGER,
        11: DataTypes.INTEGER,
        12: DataTypes.INTEGER,
        13: DataTypes.INTEGER,
        14: DataTypes.INTEGER,
        15: DataTypes.INTEGER,
        16: DataTypes.INTEGER,
        17: DataTypes.INTEGER,
        18: DataTypes.INTEGER,
        19: DataTypes.INTEGER,
        20: DataTypes.INTEGER,
        21: DataTypes.INTEGER,
        22: DataTypes.INTEGER,
        23: DataTypes.INTEGER,
        24: DataTypes.INTEGER,
        25: DataTypes.INTEGER,
        26: DataTypes.INTEGER,
        27: DataTypes.INTEGER,
        28: DataTypes.INTEGER,
        29: DataTypes.INTEGER,
        30: DataTypes.INTEGER,
        31: DataTypes.INTEGER,
    }, {
        tableName: 'usuario_dia2',
        timestamps: false
    })

    Usuario_dia2.removeAttribute('id');
    return Usuario_dia2;
}