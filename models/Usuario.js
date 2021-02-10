module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('acesso_completo', {
      id_acesso:{
          type: DataTypes.INTEGER,
          primaryKey:true
        },
        cnpj_matriz: DataTypes.STRING,
        nome: DataTypes.STRING,
        perfil: DataTypes.STRING,
        status: DataTypes.STRING,
        senha:DataTypes.STRING,
        data_nascimento: DataTypes.STRING,
        token: DataTypes.STRING,
        tipo_usuario: DataTypes.STRING,
        tipo_parceiro2: DataTypes.STRING
      },{
          tableName: 'acesso_completo',
          timestamps:false
      })
    return User;
  };

  