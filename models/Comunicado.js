module.exports = (sequelize, DataTypes) => {
    const Comunicado = sequelize.define('comunicado', {
        id_comunicado: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            primaryKey: true
        },

        numero: DataTypes.STRING,
        titulo: DataTypes.STRING,
        obs: DataTypes.STRING,
        url_img: DataTypes.STRING,
        flg_destaque: DataTypes.STRING,
        flg_ativo: DataTypes.STRING,
        data_comunicado: DataTypes.STRING,
        url_img1: DataTypes.STRING,
        url_img2: DataTypes.STRING,
        status: DataTypes.STRING
    }, {
        tableName: 'comunicado',
        timestamps: false
    })

    return Comunicado;
}