module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('product', {
        imei: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        productCode: {
            type: Sequelize.STRING,
            allowNull: false
        },
        warehouseCode: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        },
        guestId: {
            type: Sequelize.INTEGER
        },
        history: {
            type: Sequelize.STRING,
            defaultValue: ''
        }
    },
    {
        timestamps: false
    })

    return Product;
}