module.exports = (sequelize, DataTypes) => {
    const Autorizacao_inss = sequelize.define('inss_sms', {
        codigo: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            primaryKey: true,
        },

        parceiro: DataTypes.STRING,
        supervisor: DataTypes.STRING,
        gerente: DataTypes.STRING,
        responsavel: DataTypes.STRING,
        data_cadastro: DataTypes.STRING,
        data_alteracao: DataTypes.STRING,
        nome: DataTypes.STRING,
        cpf: DataTypes.STRING,
        telefone: DataTypes.STRING,
        status_inss: DataTypes.STRING,
        arquivo1: DataTypes.STRING,
        id_parceiro: DataTypes.STRING,
        cpf_parceiro: DataTypes.STRING,
        cpf_supervisor: DataTypes.STRING,
        cpf_gerente: DataTypes.STRING,
        id_acesso: DataTypes.STRING,
        data_inclusao: DataTypes.STRING

    }, {
        tableName: 'inss_sms',
        timestamps: false
    })

    return Autorizacao_inss;
}
