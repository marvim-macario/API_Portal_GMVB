module.exports = (sequelize, DataTypes) => {
    const Atualizacao_cliente = sequelize.define('atualizacao_cliente', {
        codigo: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        cpf: DataTypes.STRING,
        nome: DataTypes.STRING,
        parceiro: DataTypes.STRING,
        supervisor: DataTypes.STRING,
        gerente: DataTypes.STRING,
        tipo: DataTypes.STRING,
        correntista: DataTypes.STRING,
        status: DataTypes.STRING,
        sub_status: DataTypes.STRING,
        data_cadastro: DataTypes.STRING,
        data_atualizacao: DataTypes.STRING,
        responsavel: DataTypes.STRING,
        obs: DataTypes.STRING,
        arquivo1: DataTypes.STRING,
        arquivo2: DataTypes.STRING,
        arquivo3: DataTypes.STRING,
        arquivo4: DataTypes.STRING,
        arquivo5: DataTypes.STRING,
        arquivo6: DataTypes.STRING
    }, {
        tableName: 'atualizacao_cliente',
        timestamps: false
    })
    return Atualizacao_cliente;
}