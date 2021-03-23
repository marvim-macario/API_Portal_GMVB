module.exports = (sequelize, DataTypes) =>{
    const MargemGoverno = sequelize.define('margem_governo', {
        id_margem: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        cpf: DataTypes.STRING,
        agencia: DataTypes.STRING,
        conta: DataTypes.STRING,
        convenio: DataTypes.STRING,
        margem: DataTypes.STRING,
        status: DataTypes.STRING,
        data_atualizacao: DataTypes.STRING,
        parceiro: DataTypes.STRING,
        data_venda: DataTypes.STRING,
        supervisor: DataTypes.STRING,
        gerente: DataTypes.STRING,
        id_acesso: DataTypes.STRING,
        cpf_parceiro: DataTypes.STRING,
        cpf_supervisor: DataTypes.STRING,
        cpf_gerente: DataTypes.STRING,
        responsavel: DataTypes.STRING,
        data_inclusao: DataTypes.STRING
    },{
        tableName: 'margem_governo',
        timestamps: false
    })
    return MargemGoverno
};
