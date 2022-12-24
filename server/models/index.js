const { Sequelize, DataTypes} = require("sequelize");
const dbConfig = require("../configs/db.config");

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        port: dbConfig.PORT
    }
);

const users = require("./user.model")(sequelize, DataTypes);
const products = require("./product.model")(sequelize, DataTypes);
const roles = require("./role.model")(sequelize, DataTypes);
const guests = require("./guest.model")(sequelize, DataTypes);
const productLines = require("./productLine.model")(sequelize, DataTypes);

users.hasMany(products);
users.belongsTo(roles, {
    foreignKey: 'role_id'
});
guests.hasMany(products);
productLines.hasMany(products);

const db = {
    users,
    products,
    roles,
    guests,
    productLines
};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;