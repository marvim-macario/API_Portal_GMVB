module.exports = (sequelize, DataTypes) => {
    const ParceirosRestritos = sequelize.define('lista_cpf', {
        id_cpf:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        cpf: DataTypes.STRING, 
        data_criacao: DataTypes.STRING, 
        responsavel: DataTypes.STRING,
        nome: DataTypes.STRING,
        cnpj: DataTypes.STRING,
        razao_social: DataTypes.STRING, 
        motivo: DataTypes.STRING,
        solicitante: DataTypes.STRING,
        nome_1: DataTypes.STRING,
        nome_2: DataTypes.STRING,
        nome_3: DataTypes.STRING,
        nome_4: DataTypes.STRING,
        cnpj_1: DataTypes.STRING,
        cnpj_2: DataTypes.STRING,
        cnpj_4: DataTypes.STRING,
        cnpj_3: DataTypes.STRING,
        id_acesso: DataTypes.STRING,
        parceiro: DataTypes.STRING,
        cpf_parceiro: DataTypes.STRING,
        supervisor: DataTypes.STRING,
        cpf_supervisor: DataTypes.STRING,
        gerente: DataTypes.STRING,
        cpf_gerente: DataTypes.STRING,
        data_inclusao: DataTypes.STRING,
        data_atualizacao: DataTypes.STRING
    },{
        tableName: 'lista_cpf',
        timestamps: false
    })
    return ParceirosRestritos
};