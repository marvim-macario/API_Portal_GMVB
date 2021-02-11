module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define('status', {
        id_status: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        status: DataTypes.STRING,
        tipo_fase: DataTypes.STRING,
        situacao: DataTypes.STRING,
        sla: DataTypes.STRING,
        usuario_master: DataTypes.STRING,
        etapa_sms: DataTypes.STRING,
    }, {
        tableName: 'status',
        timestamps: false
    })
    return Status;
};






// id_status int(11) AI PK 
// status varchar(255) 
// tipo_fase varchar(255) 
// situacao varchar(255) 
// sla varchar(45) 
// usuario_master varchar(255) 
// etapa_sms varchar(255)