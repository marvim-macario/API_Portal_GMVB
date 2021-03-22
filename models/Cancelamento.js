module.exports = (sequelize, DataTypes) => {
    const Cancelamento = sequelize.define('cancelamento', {
        id_cancelamento: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        motivo_cancelamento1: DataTypes.STRING,
        proposta: DataTypes.STRING,
        parceiro: DataTypes.STRING,
        supervisor: DataTypes.STRING,
        gerente: DataTypes.STRING,
        status: DataTypes.STRING,
        data_inclusao: DataTypes.STRING,
        data_cancelamento: DataTypes.STRING,
        responsavel: DataTypes.STRING,
        obs: DataTypes.STRING,
        empresa: DataTypes.STRING,
        data_atualizacao: DataTypes.STRING,
        cpf: DataTypes.STRING,
        cpf_parceiro: DataTypes.STRING,
        cpf_supervisor: DataTypes.STRING,
        cpf_gerente: DataTypes.STRING,
        id_acesso: DataTypes.STRING
    }, {
        tableName: 'cancelamento',
        timestamps: false
    })
    return Cancelamento;
};