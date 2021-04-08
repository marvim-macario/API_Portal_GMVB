module.exports = (sequelize, DataTypes) => {
    const Parceiro_semtabela = sequelize.define('PARCEIRO_SEMTABELA', {
        cnpj: DataTypes.STRING,
        parceiro: DataTypes.STRING,
        supervisor: DataTypes.STRING,
        gerente: DataTypes.STRING,
        TABELA_NORMAIS: DataTypes.STRING,
        TABELA_ESPECIAIS: DataTypes.STRING,
        TABELA_MINAS: DataTypes.STRING,
        TABELA_RIO: DataTypes.STRING,
        TABELA_MULTIBANCOS: DataTypes.STRING,
        TABELA_SIM: DataTypes.STRING,
        TABELA_CREFISA: DataTypes.STRING
    }, {
        tableName: 'PARCEIRO_SEMTABELA',
        timestamps: false
    })

    return Parceiro_semtabela;
}