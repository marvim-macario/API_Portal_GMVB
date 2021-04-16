module.exports = (sequelize, DataTypes) => {
    const Calculadora = sequelize.define('calculadora', {
        idcalculadora: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        convenio: DataTypes.STRING,
        regra: DataTypes.STRING,
        prazo: DataTypes.STRING,
        dia: DataTypes.STRING,
        coef: DataTypes.STRING,
        taxa: DataTypes.STRING,
        correntista: DataTypes.STRING,
        valor_contrato: DataTypes.STRING,
        seguro: DataTypes.STRING,
        valor_parcela: DataTypes.STRING,
        id_index: DataTypes.INTEGER,
        banco: DataTypes.STRING
    }, {
        tableName: 'calculadora',
        timestamps: false
    })

    return Calculadora;
}

