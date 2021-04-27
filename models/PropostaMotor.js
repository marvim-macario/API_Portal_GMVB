
module.exports = (sequelize, DataTypes) => {
    const PROPOSTA_MOTOR = sequelize.define('PROPOSTA_MOTOR', {

        parceiro: DataTypes.STRING, 
        cnpJ: DataTypes.STRING,
        supervisor_sant: DataTypes.STRING, 
        tipo: DataTypes.STRING, 
        data_admissao: DataTypes.STRING, 
        data_inativacao: DataTypes.STRING, 
        gerente_sant: DataTypes.STRING, 
        tipo_func: DataTypes.STRING,
    }, {
        tableName: 'PROPOSTA_MOTOR',
        timestamps: false
    })
    return PROPOSTA_MOTOR;
};
