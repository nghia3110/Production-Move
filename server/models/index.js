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
const wareHouses = require("./wareHouse.model")(sequelize, DataTypes);
const productDetails = require("./productDetail.model")(sequelize, DataTypes);
const guests = require("./guest.model")(sequelize, DataTypes);

users.hasOne(wareHouses);

const db = {
    users,
    products,
    wareHouses,
    productDetails,
    guests
};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;