module.exports = (sequelize, Sequelize) => {
    const Warehouse = sequelize.define('warehouse', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, 
    {
        timestamps: false
    });
    return Warehouse;
}