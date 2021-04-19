module.exports = (sequelize, DataTypes) => {
    const Faixa_campanha = sequelize.define('faixa_campanha', {
        mes: DataTypes.STRING,
        faixa: DataTypes.STRING,
        valor_campanha: DataTypes.STRING
    }, {
        tableName: 'faixa_campanha',
        timestamps: false
    })
    
    Faixa_campanha.removeAttribute('id'); 
    return Faixa_campanha;
}