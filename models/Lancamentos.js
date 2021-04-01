module.exports = (sequelize, DataTypes) => {
    const lacamentos = sequelize.define('lancamentos', {
        id_lancamento: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            primaryKey: true
        },

        data_movimento: DataTypes.STRING,
        ref: DataTypes.STRING,
        banco: DataTypes.STRING,
        filial: DataTypes.STRING,
        uf: DataTypes.STRING,
        grupo: DataTypes.STRING,
        sub_grupo: DataTypes.STRING,
        projeto: DataTypes.STRING,
        cnpj: DataTypes.STRING,
        parceiro: DataTypes.STRING,
        cpf: DataTypes.STRING,
        favorecido: DataTypes.STRING,
        supervisor: DataTypes.STRING,
        gerente: DataTypes.STRING,
        tipo_pagamento: DataTypes.STRING,
        banco_parceiro: DataTypes.STRING,
        agencia_parceiro: DataTypes.STRING,
        conta_parceiro: DataTypes.STRING,
        numero_cartao: DataTypes.STRING,
        solicitante:DataTypes.STRING,
        descricao: DataTypes.STRING,
        obs: DataTypes.STRING,
        valor: DataTypes.STRING,
        empresa: DataTypes.STRING,
        data_cadastro: DataTypes.STRING,
        data_alteracao: DataTypes.STRING,
        responsavel: DataTypes.STRING,
        tp_lancamento: DataTypes.STRING,
        cod_lancamento: DataTypes.STRING,
        arquivo1: DataTypes.STRING,
        arquivo2: DataTypes.STRING,
        arquivo3: DataTypes.STRING,
        arquivo4: DataTypes.STRING,
        codigo_barra: DataTypes.STRING,
        digitacao: DataTypes.STRING,
        data_vencimento: DataTypes.STRING,
        status_pag: DataTypes.STRING,
        tipo_lancamento: DataTypes.STRING,
        tipo_funcionario: DataTypes.STRING,
        tipo_despesa: DataTypes.STRING,
        cpf_parceiro: DataTypes.STRING,
        cpf_supervisor: DataTypes.STRING,
        cpf_gerente: DataTypes.STRING,
        id_acesso: DataTypes.STRING
    }, {
        tableName: 'lancamentos',
        timestamps: false
    })

    return lacamentos;
}