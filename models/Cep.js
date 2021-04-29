module.exports = (sequelize, DataTypes) => {
    const Cep = sequelize.define('cep', {
        id_cep: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        cep_num :DataTypes.DOUBLE,
        cod_agencia :DataTypes.STRING, 
        nome_agencia :DataTypes.STRING, 
        endereco :DataTypes.STRING, 
        bairro :DataTypes.STRING, 
        cidade :DataTypes.STRING, 
        uf :DataTypes.STRING, 
        cep :DataTypes.STRING, 
        telefone: DataTypes.STRING
    }, {
        tableName: 'cep',
        timestamps: false
    })
    return Cep;
};