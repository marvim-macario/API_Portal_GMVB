module.exports = (sequelize, DataTypes) => {
    const Assistencia = sequelize.define('assistencia', {
        codigo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        cliente_nome: DataTypes.STRING,
        cliente_cpf: DataTypes.STRING,
        data_nascimento: DataTypes.STRING,
        cep: DataTypes.STRING,
        rua: DataTypes.STRING,      
        bairro: DataTypes.STRING,
        numero: DataTypes.STRING,
        complemento: DataTypes.STRING,
        email: DataTypes.STRING,
        telefone: DataTypes.STRING,
        tipo_contratacao: DataTypes.STRING,
        banco: DataTypes.STRING,
        agencia: DataTypes.STRING,
        conta: DataTypes.STRING,
        tipo_conta: DataTypes.STRING,
        status: DataTypes.STRING,
        tipo_assistencia: DataTypes.STRING,
        forma_contratacao: DataTypes.STRING,
        parceiro: DataTypes.STRING,
        id_parceiro: DataTypes.STRING,
        cpf_parceiro: DataTypes.STRING,
        supervisor: DataTypes.STRING,
        gerente: DataTypes.STRING,
        data_inclusao: DataTypes.STRING,
        responsavel_alteracao: DataTypes.STRING,
        data_alteracao: DataTypes.STRING
    },{
        tableName: 'assistencia',
        timestamps: false
    })
    return Assistencia
};
