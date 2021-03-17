module.exports = (sequelize, DataTypes) =>{
    const Banco_Origi = sequelize.define('banco_origi',{
        id_banco:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        banco: DataTypes.STRING
    },{
        tableName: 'banco_origi',
        timesTamps: false
    })
    return Banco_Origi
};

//SELECT * FROM banco_origi where tipo_banco = 'MULTI BANCOS' order by banco