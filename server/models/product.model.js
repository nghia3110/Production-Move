module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('product', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        serialNumber: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        },
        ngaySanXuat: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        thoiGianBaoHanh: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: false
    })

    return Product;
}