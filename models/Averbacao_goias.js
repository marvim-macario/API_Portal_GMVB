module.exports = (sequelize, DataTypes) => {
    const Averbacao_goias = sequelize.define('averbacao_goias', {
        codigo: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            primaryKey: true,
        },

        tipo: DataTypes.STRING,
        tipo_formalizacao: DataTypes.STRING,
        valor_solicitado: DataTypes.STRING,
        parcela: DataTypes.STRING,
        prazo: DataTypes.STRING,
        senha: DataTypes.STRING,
        validade_senha: DataTypes.STRING,
        averbacao_goiascol: DataTypes.STRING,
        data_envio: DataTypes.STRING,
        status: DataTypes.STRING,
        parceiro: DataTypes.STRING,
        supervisor: DataTypes.STRING,
        gerente: DataTypes.STRING,
        data_atualizacao: DataTypes.STRING,
        responsavel: DataTypes.STRING,
        arquivo1: DataTypes.STRING,
        id_parceiro: DataTypes.STRING,
        proposta: DataTypes.STRING,
        cpf: DataTypes.STRING,
        matricula: DataTypes.STRING,
        original_parcela: DataTypes.STRING,
        id_acesso: DataTypes.STRING,
        cpf_supervisor: DataTypes.STRING,
        cpf_gerente: DataTypes.STRING,
        cpf_parceiro: DataTypes.STRING,
        data_inclusao: DataTypes.STRING
    }, {
        tableName: 'averbacao_goias',
        timestamps: false
    })

    return Averbacao_goias;
}