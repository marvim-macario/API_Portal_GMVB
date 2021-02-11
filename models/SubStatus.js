module.exports = (sequelize, DataTypes) => {
    const SubStatus = sequelize.define('sub_status', {
        id_substatus: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        
        },
        id_status: DataTypes.INTEGER,
        status:DataTypes.STRING,
        sub_status:DataTypes.STRING
    }, {
        tableName: 'sub_status',
        timestamps: false
    })
    return SubStatus;
};

