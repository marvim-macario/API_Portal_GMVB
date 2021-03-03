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
            saldo_devedor:DataTypes.STRING, 
            prazo_restante:DataTypes.STRING, 
            taxa_juros:DataTypes.STRING, 
            parceiro:DataTypes.STRING, 
            data_envio:DataTypes.STRING, 
            responsavel:DataTypes.STRING, 
            data_atualizacao:DataTypes.STRING, 
            status:DataTypes.STRING, 
            parcela: DataTypes.STRING,
            arquivo1:DataTypes.STRING, 
            id_parceiro: DataTypes.STRING,
            senha:DataTypes.STRING,
            margem:DataTypes.STRING,
            cnpj:DataTypes.STRING,
            supervisor:DataTypes.STRING,
            gerente:DataTypes.STRING
    }, {
        tableName: 'margem',
        timestamps: false
    })
    return Margem;
};