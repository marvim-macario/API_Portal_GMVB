module.exports = (sequelize, DataTypes) => {
    const Margem = sequelize.define('margem', {
        codigo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
            convenio:DataTypes.STRING, 
            cpf: DataTypes.STRING,
            matricula: DataTypes.STRING,
            parceiro:DataTypes.STRING, 
            data_envio:DataTypes.STRING, 
            responsavel:DataTypes.STRING, 
            data_atualizacao:DataTypes.STRING, 
            status:DataTypes.STRING, 
            arquivo1:DataTypes.STRING, 
            id_parceiro: DataTypes.STRING,
            senha:DataTypes.STRING,
            valor_margem:DataTypes.STRING,
            supervisor:DataTypes.STRING,
            gerente:DataTypes.STRING,
            id_acesso: DataTypes.STRING,
            cpf_parceiro: DataTypes.STRING,
            cpf_supervisor: DataTypes.STRING,
            cpf_gerente: DataTypes.STRING,
            data_inclusao: DataTypes.STRING
    }, {
        tableName: 'margem',
        timestamps: false
    })
    return Margem;
};