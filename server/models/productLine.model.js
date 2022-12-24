module.exports = (sequelize, Sequelize) => {
    const ProductLine = sequelize.define('productline', {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        image: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false
    })

    return ProductLine;
}