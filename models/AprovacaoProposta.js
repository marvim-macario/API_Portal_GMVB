module.exports = (sequelize, DataTypes) => {
    const AprovacaoProposta = sequelize.define('fluxo_digital', {
        id_fluxo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        banco: DataTypes.STRING,
        proposta: DataTypes.STRING,
        cpf: DataTypes.STRING,
        tipo: DataTypes.STRING,
        status: DataTypes.STRING,      
        data_inclusao: DataTypes.STRING,
        parceiro: DataTypes.STRING,
        supervisor: DataTypes.STRING,
        gerente: DataTypes.STRING,
        data_alteracao: DataTypes.STRING,
        responsavel: DataTypes.STRING,
        cpf_supervisor: DataTypes.STRING,
        cpf_gerente: DataTypes.STRING,
        cpf_parceiro: DataTypes.STRING,
        id_acesso: DataTypes.STRING,
        data_atualizacao: DataTypes.STRING
    },{
        tableName: 'fluxo_digital',
        timestamps: false
    })
    return AprovacaoProposta
};

