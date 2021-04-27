
module.exports = (sequelize, DataTypes) => {
    const MASCARA_MOTOR = sequelize.define('MASCARA_MOTOR', {
        
        parceiro: DataTypes.STRING, 
        cnpj :DataTypes.STRING,
        supervisor_sant: DataTypes.STRING, 
        tipo: DataTypes.STRING, 
        data_admissao: DataTypes.STRING, 
        data_inativacao: DataTypes.STRING, 
        gerente_sant: DataTypes.STRING, 
        tipo_func: DataTypes.STRING, 
        proposta: DataTypes.STRING,
    }, {
        tableName: 'MASCARA_MOTOR',
        timestamps: false
    })
    return MASCARA_MOTOR;
};