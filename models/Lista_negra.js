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
        supervisor: DataTypes.STRING,
        responsavel: DataTypes.STRING,
        cpf_parceiro: DataTypes.STRING,
        cpf_gerente: DataTypes.STRING,
        id_acesso: DataTypes.STRING,
        data_atualizacao: DataTypes.STRING,
        data_inclusao: DataTypes.STRING,
        gerente: DataTypes.STRING,
        cpf_supervisor: DataTypes.STRING,
        id_parceiro: DataTypes.STRING
    }, {
        tableName: 'lista_negra',
        timestamps: false
    })

    return Lista_negra;
};