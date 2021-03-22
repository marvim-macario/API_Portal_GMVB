module.exports = (sequelize, DataTypes) => {
    const SaldoDevedor = sequelize.define('saldo_devedor', {
        codigo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
                       
            convenio: DataTypes.STRING, 
            cpf: DataTypes.STRING, 
            matricula: DataTypes.STRING, 
            saldo_devedor1: DataTypes.STRING, 
            prazo_restante: DataTypes.STRING, 
            taxa_juros: DataTypes.STRING, 
            parceiro: DataTypes.STRING, 
            data_envio: DataTypes.STRING, 
            responsavel: DataTypes.STRING, 
            data_atualizacao: DataTypes.STRING, 
            status: DataTypes.STRING, 
            parcela: DataTypes.STRING, 
            data_nascimento: DataTypes.STRING, 
            renda: DataTypes.STRING, 
            banco_origi: DataTypes.STRING, 
            id_parceiro: DataTypes.STRING, 
            idt_margem: DataTypes.STRING, 
            id_acesso: DataTypes.STRING,
            cpf_usuario: DataTypes.STRING,
            supervisor: DataTypes.STRING,
            cpf_supervisor: DataTypes.STRING,
            gerente: DataTypes.STRING,
            cpf_gerente: DataTypes.STRING,
            data_inclusao: DataTypes.STRING
    }, {
        tableName: 'saldo_devedor',
        timestamps: false
    })
    return SaldoDevedor;
};