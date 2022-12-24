module.exports = (sequelize, Sequelize) => {
    const Guest = sequelize.define('guest', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
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
        timestamps: false
    });
    return Guest;
}