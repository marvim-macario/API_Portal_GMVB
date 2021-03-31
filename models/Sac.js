module.exports = (sequelize, DataTypes) => {
    const Sac = sequelize.define('sac', {
        id_sac: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome:DataTypes.STRING,
        cpf:DataTypes.STRING,
        telefone:DataTypes.STRING,
        email:DataTypes.STRING,
        data_recebimento:DataTypes.STRING,
        data_inclusao:DataTypes.STRING,
        data_resposta:DataTypes.STRING,
        resposta:DataTypes.STRING,
        questionamento:DataTypes.STRING,
        banco:DataTypes.STRING,
        status:DataTypes.STRING,
        data_alteracao:DataTypes.STRING,
        responsavel:DataTypes.STRING,
        protocolo:DataTypes.STRING,
        classificacao:DataTypes.STRING,
        valor_operacao:DataTypes.STRING,
        contrato:DataTypes.STRING,
        parceiro:DataTypes.STRING,
        supervisor:DataTypes.STRING,
        gerente:DataTypes.STRING,
        tempo_atuacao:DataTypes.STRING,
        arquivo2:DataTypes.STRING,
        arquivo1:DataTypes.STRING,
        mes:DataTypes.STRING,
        arquivo3:DataTypes.STRING,
        arquivo4:DataTypes.STRING,
        protocolo_banco:DataTypes.STRING,
        procedente:DataTypes.STRING,
        empresa:DataTypes.STRING,
        cpf_parceiro:DataTypes.STRING,
        cpf_gerente:DataTypes.STRING,
        cpf_supervisor:DataTypes.STRING,
        id_acesso:DataTypes.STRING
    },{
        tableName: 'sac',
        timestamps: false
    })
    return Sac;
};