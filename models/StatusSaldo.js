module.exports = (sequelize, DataTypes) => {
    const StatusSaldo = sequelize.define('status_saldo', {
        id_status: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
                       
            status: DataTypes.STRING, 
        
    }, {
        tableName: 'status_saldo',
        timestamps: false
    })
    return StatusSaldo;
};