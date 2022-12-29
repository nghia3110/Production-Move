module.exports = (sequelize, Sequelize) => {
    const Guest = sequelize.define('guest', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: Sequelize.STRING,
            allowNull: false
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, 
    {
        timestamps: false,
    });
    return Guest;
}