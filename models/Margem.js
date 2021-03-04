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
            prazo_restante:DataTypes.STRING, 
            taxa_juros:DataTypes.STRING, 
            parceiro:DataTypes.STRING, 
            data_envio:DataTypes.STRING, 
            responsavel:DataTypes.STRING, 
            data_atualizacao:DataTypes.STRING, 
            status:DataTypes.STRING, 
            arquivo1:DataTypes.STRING, 
            id_parceiro: DataTypes.STRING,
            senha:DataTypes.STRING,
            valor_margem:DataTypes.STRING,
            cnpj:DataTypes.STRING,
            supervisor:DataTypes.STRING,
            gerente:DataTypes.STRING
    }, {
        tableName: 'margem',
        timestamps: false
    })
    return Margem;
};