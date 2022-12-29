module.exports = (sequelize, Sequelize) => {
    const ProductDetail = sequelize.define('productdetail', {
        productCode: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        productLine: {
            type: Sequelize.STRING,
            allowNull: false
        },
        model: {
            type: Sequelize.STRING,
            allowNull: false
        },
        displayType: {
            type: Sequelize.STRING,
            allowNull: false
        },
        resolution_w: {
            type: Sequelize.STRING,
            allowNull: false
        },
        resolution_h: {
            type: Sequelize.STRING,
            allowNull: false
        },
        mainCamera: {
            type: Sequelize.STRING,
            allowNull: false
        },
        selfieCamera: {
            type: Sequelize.STRING,
            allowNull: false
        },
        OS: {
            type: Sequelize.STRING,
            allowNull: false
        },
        CPU: {
            type: Sequelize.STRING,
            allowNull: false
        },
        GPU: {
            type: Sequelize.STRING
        },
        RAM: {
            type: Sequelize.STRING,
            allowNull: false
        },
        connectivity: {
            type: Sequelize.STRING,
            allowNull: false
        },
        battery: {
            type: Sequelize.STRING,
            allowNull: false
        },
        charging: {
            type: Sequelize.STRING,
            allowNull: false
        },
        width: {
            type: Sequelize.STRING,
            allowNull: false
        },
        height: {
            type: Sequelize.STRING,
            allowNull: false
        },
        weight: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false
    })

    return ProductDetail;
}