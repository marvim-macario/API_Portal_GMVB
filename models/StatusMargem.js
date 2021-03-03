module.exports = (sequelize, DataTypes) => {
    const StatusMargem = sequelize.define('status_margem', {
        id_status: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        status:DataTypes.STRING,
    }, {
        tableName: 'status_margem',
        timestamps: false
    })
    return StatusMargem;
};