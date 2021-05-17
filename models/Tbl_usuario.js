module.exports = (sequelize, DataTypes) => {
    const Tbl_usuario = sequelize.define('tbl_usuario', {
        id_usuario: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        nome: DataTypes.STRING,
        senha: DataTypes.STRING,
        usuario: DataTypes.STRING,
        gerente: DataTypes.STRING,
        supervisor: DataTypes.STRING,
        chavej: DataTypes.STRING,
        cpf: DataTypes.STRING,
        status: DataTypes.STRING,
        tbl_usuariocol: DataTypes.STRING,
        parceiro: DataTypes.STRING,
        gerente_parceiro: DataTypes.STRING,
        id_ead: DataTypes.STRING,
        arquivo1: DataTypes.STRING,
        arquivo2: DataTypes.STRING,
        foto: DataTypes.STRING,
        nome_correto: DataTypes.STRING  
    }, {
        tableName: "tbl_usuario",
        timestamps: false
    });
    return Tbl_usuario;
}