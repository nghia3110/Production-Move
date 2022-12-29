const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");
const db = require("../models");
const generateImei = require("../utils/generateImei");

const ProductController = {
    async getAllProduct(req, res) {
        try {
            const result = await db.products.findAll();
            res.status(200).send(result);
        } catch (e) {
            res.status(500).send({ message: e });
        }
    },

    async getProductDetail(req, res) {
        const imei = req.params.imei;
        try {
            const result = await sequelize.query(`select * from products 
            where imei = '${imei}'`, { type: QueryTypes.SELECT });
            res.status(200).send(result);
        } catch (e) {
            res.status(500).send({ message: e });
        }
    },

    async addProduct(req, res) {
        const data = req.body;
        if (!data.model || !data.quantity || !data.userId) {
            res.status(400).send({
                message: "Content can't be empty!"
            });
            return;
        }
        const name = await sequelize.query(`select name from users 
        where id = ${data.userId}`, { type: QueryTypes.SELECT });
        const warehouseCode = await sequelize.query(`select id from warehouses
        where userId = ${data.userId}`, { type: QueryTypes.SELECT });
        const productCode = await sequelize.query(`select productCode from productdetails 
        where model = '${data.model}'`, { type: QueryTypes.SELECT });
        try {
            for (let i = 1; i <= parseInt(data.quantity); i++) {
                const Product = {
                    imei: generateImei(productCode[0].productCode, warehouseCode[0].id, i),
                    warehouseCode: warehouseCode[0].id,
                    productCode: productCode[0].productCode,
                    status: 'Mới sản xuất',
                    history: name[0].name
                };
                await db.products.create(Product);
            }
            res.status(201).send({ message: `Add ${data.quantity} product success!` });
        } catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    },

    async receiveProductsFromFactory(req, res) {
        const data = req.body;
        if (!data.model || !data.quantity || !data.agencyId || !data.factory) {
            res.status(400).send({
                message: "Content can't be empty!"
            });
            return;
        }
        const name = await sequelize.query(`select name from users 
        where id = ${data.agencyId}`, { type: QueryTypes.SELECT });
        const productCode = await sequelize.query(`select productCode from productdetails 
        where model = '${data.model}'`, { type: QueryTypes.SELECT });
        const agencyWarehouseCode = await sequelize.query(`select w.id from warehouses as w
        where userId = ${parseInt(data.agencyId)}`, { type: QueryTypes.SELECT });
        const factoryWarehouseCode = await sequelize.query(`select w.id from warehouses as w
        inner join users as u on w.userId = u.id where u.name = '${data.factory}' `, { type: QueryTypes.SELECT })
        try {
            await sequelize.query(
                `update products
            set warehouseCode = ${agencyWarehouseCode[0].id}, status = 'Đưa về đại lý', history = concat(history, ',', '${name[0].name}')
            where productCode = '${productCode[0].productCode}' and warehouseCode = ${factoryWarehouseCode[0].id}
            limit ${data.quantity};`, { type: QueryTypes.SELECT });

            res.status(201).send('Update success!');
        } catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    },

    async sellProduct(req, res) {
        const data = req.body;
        if (!data.imei || !data.name || !data.address || !data.phoneNumber) {
            res.status(400).send({
                message: "Content can't be empty!"
            });
            return;
        }
        const Guest = {
            id: Math.floor(Math.random() * 1000) + 1,
            name: data.name,
            phoneNumber: data.phoneNumber,
            address: data.address
        };
        await db.guests.create(Guest);
        try {
            await sequelize.query(
                `update products
            set guestId = ${Guest.id}, status = 'Đã bán', warehouseCode = null, history = concat(history, ',', 'Guest ${Guest.id}')
            where imei = '${data.imei}';`, { type: QueryTypes.SELECT });
            res.status(201).send('Update success!');
        } catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    },

    async distributeProduct(req, res) {
        const data = req.body;
        if (!data.model || !data.quantity || !data.factoryId || !data.agency) {
            res.status(400).send({
                message: "Content can't be empty!"
            });
            return;
        }
        const productCode = await sequelize.query(`select productCode from productdetails 
        where model = '${data.model}'`, { type: QueryTypes.SELECT });
        const factoryWarehouseCode = await sequelize.query(`select w.id from warehouses as w
        where userId = ${parseInt(data.factoryId)}`, { type: QueryTypes.SELECT });
        const agencyWarehouseCode = await sequelize.query(`select w.id from warehouses as w
        inner join users as u on w.userId = u.id where u.name = '${data.agency}' `, { type: QueryTypes.SELECT })
        try {
            await sequelize.query(
                `update products
            set warehouseCode = ${agencyWarehouseCode[0].id}, status = 'Đưa về đại lý', history = concat(history, ',', '${data.agency}')
            where productCode = '${productCode[0].productCode}' and warehouseCode = ${factoryWarehouseCode[0].id}
            limit ${data.quantity};`, { type: QueryTypes.SELECT });

            res.status(201).send('Update success!');
        } catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    },

    async guaranteeProduct(req, res) {
        const data = req.body;
        if (!data.imei || !data.agencyId || !data.guarantee) {
            res.status(400).send({
                message: "Content can't be empty!"
            });
            return;
        }
        const agencyWarehouseCode = await sequelize.query(`select w.id from warehouses as w
        where userId = ${parseInt(data.agencyId)}`, { type: QueryTypes.SELECT });
        const guaranteeCode = await sequelize.query(`select w.id from warehouses as w
        inner join users as u on w.userId = u.id where u.name = '${data.guarantee}' `, { type: QueryTypes.SELECT })
        try {
            await sequelize.query(
                `update products
            set warehouseCode = ${guaranteeCode[0].id}, status = 'Đang bảo hành', history = concat(history, ',', '${data.guarantee}')
            where imei = '${data.imei}' and warehouseCode = ${agencyWarehouseCode[0].id}`,
                { type: QueryTypes.SELECT });

            res.status(201).send('Update success!');
        } catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    },

    async givebackProduct(req, res) {
        const data = req.body;
        if (!data.imei || !data.guaranteeId) {
            res.status(400).send({
                message: "Content can't be empty!"
            });
            return;
        }
        let status;
        let giveBackTo;
        if (data.factory) {
            status = 'Lỗi, đã đưa về cơ sở sản xuất';
            giveBackTo = data.factory;
        }
        if (data.agency) {
            status = 'Đã bảo hành xong';
            giveBackTo = data.agency;
        }

        const guaranteeWareHouseCode = await sequelize.query(`select w.id from warehouses as w
        where userId = ${parseInt(data.guaranteeId)}`, { type: QueryTypes.SELECT });
        const backToCode = await sequelize.query(`select w.id from warehouses as w
        inner join users as u on w.userId = u.id where u.name = '${giveBackTo}' `, { type: QueryTypes.SELECT })
        try {
            await sequelize.query(
                `update products
            set warehouseCode = ${backToCode[0].id}, status = '${status}', history = concat(history, ',', '${giveBackTo}')
            where imei = '${data.imei}' and warehouseCode = ${guaranteeWareHouseCode[0].id}`,
                { type: QueryTypes.SELECT });

            res.status(201).send('Update success!');
        } catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    },

    async getQuantityByID(req, res) {
        const id = req.params.id;
        const warehouseCode = await sequelize.query(`select w.id from warehouses as w
        where userId = ${parseInt(id)}`, { type: QueryTypes.SELECT });
        try {
            const result = await sequelize.query(`select model, count(p.productCode) as quantity from productdetails as pd
            inner join products as p on p.productCode = pd.productCode
            where p.warehouseCode = ${warehouseCode[0].id}
            group by p.productCode;`, { type: QueryTypes.SELECT });
            res.status(201).send(result);
        } catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    },

    async getProductByWarehouse(req, res) {
        const id = req.params.id;
        const warehouseCode = await sequelize.query(`select w.id from warehouses as w
        where userId = ${parseInt(id)}`, { type: QueryTypes.SELECT });
        try {
            const result = await sequelize.query(`select * from products
            where warehouseCode = ${warehouseCode[0].id}`, { type: QueryTypes.SELECT });
            res.status(201).send(result);
        } catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    },

    async getProductErrorInAgency(req, res) {
        const id = req.params.id;
        const warehouseCode = await sequelize.query(`select w.id from warehouses as w
        where userId = ${parseInt(id)}`, { type: QueryTypes.SELECT });
        try {
            const result = await sequelize.query(`select * from products
            where warehouseCode = ${warehouseCode[0].id} and status = 'Lỗi, cần sửa chữa'`, { type: QueryTypes.SELECT });
            res.status(201).send(result);
        } catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    },

    async countProductline(req, res) {
        try {
            const result = await sequelize.query(`SELECT productCode FROM products
            group by productCode;`, { type: QueryTypes.SELECT });
            res.status(201).send(result);
        } catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    },

    async countProductByStatus(req, res) {
        try {
            const result = await sequelize.query(
                `SELECT status as x, count(*) AS y FROM products 
                GROUP BY status;`, { type: QueryTypes.SELECT });
            res.status(200).send(result);
        } catch (e) {
            res.status(500).send({ message: e });
        }
    },

    async countProductByFactory(req, res) {
        try {
            const result = await sequelize.query(
                `select u.name as x, count(*) as y from users as u
                inner join warehouses as w on w.userId = u.id
                inner join products as p on p.warehouseCode = w.id
                where u.role = 'Cơ sở sản xuất'
                group by u.name;`, { type: QueryTypes.SELECT });
            res.status(200).send(result);
        } catch (e) {
            res.status(500).send({ message: e });
        }
    },

    async countProductByAgency(req, res) {
        try {
            const result = await sequelize.query(
                `select u.name as x, count(*) as y from users as u
                inner join warehouses as w on w.userId = u.id
                inner join products as p on p.warehouseCode = w.id
                where u.role = 'Đại lý'
                group by u.name;`, { type: QueryTypes.SELECT });
            res.status(200).send(result);
        } catch (e) {
            res.status(500).send({ message: e });
        }
    },

    async countProductByGuarantee(req, res) {
        try {
            const result = await sequelize.query(
                `select u.name as x, count(*) as y from users as u
                inner join warehouses as w on w.userId = u.id
                inner join products as p on p.warehouseCode = w.id
                where u.role = 'Trung tâm bảo hành'
                group by u.name;`, { type: QueryTypes.SELECT });
            res.status(200).send(result);
        } catch (e) {
            res.status(500).send({ message: e });
        }
    }
};

module.exports = ProductController;