module.exports = (sequelize, DataTypes) => {
    const Lista_negra = sequelize.define('lista_negra', {
        id_lista: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            primaryKey: true,
        },

        cpf: DataTypes.STRING,
        motivo: DataTypes.STRING,
        parceiro: DataTypes.STRING,
        supervisor: DataTypes.STRING
    }, {
        tableName: 'lista_negra',
        timestamps: false
    })

    return Lista_negra;
};