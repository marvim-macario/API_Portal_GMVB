module.exports = (sequelize, DataTypes) => {
    const filial = sequelize.define('filial', {
        id_filial:{
            type: DataTypes.INTEGER,
            primaryKey:true
      },
        filial: DataTypes.STRING,
        
    },{
          tableName: 'filial',
          timestamps:false
    })
    return filial;
  };


  