const db = require('../models/index.js');
const bcrypt = require('bcrypt');
const { Op, QueryTypes } = require('sequelize');
const generateToken = require('../utils/generateToken.js');

const UserController = {
    async create(req, res) {
        const userData = req.body;
        if (!userData.username || !userData.password || !userData.name || !userData.phoneNumber || !userData.address || !userData.role || !userData.email) {
            res.status(400).send({
                message: "Content can't be empty!"
            });
            return;
        }

        let findInDB = await db.users.findAll({
            where: {
                [Op.or]: [{ username: userData.username }, { email: userData.email }, { phoneNumber: userData.phoneNumber }]
            }
        });

        if (findInDB.length != 0) {
            res.status(406).send({ message: "There is an account registered with given information. Please check username, phoneNumber or email!" });
        } else {
            const result = await db.sequelize.query(`SELECT id FROM roles WHERE name = '${userData.role}'`, { type: QueryTypes.SELECT });
            const roleID = result[0].id;
            let status = 'Chờ kiểm duyệt';
            if(roleID == 4) status = null;
            try {
                const hashPassword = await bcrypt.hash(userData.password, 10);
                const User = {
                    username: userData.username,
                    password: hashPassword,
                    name: userData.name,
                    email: userData.email,
                    phoneNumber: userData.phoneNumber,
                    address: userData.address,
                    role_id: roleID,
                    status: status
                };

                await db.users.create(User);
                res.status(201).send({ message: 'Register Successfully!' });
            } catch (err) {
                res.status(500).send({ message: `${err}` });
            }
        }
    },

    async getAllUser(req, res) {
        try {
            let result = await db.users.findAll();
            res.status(200).send(result);
        } catch (e) {
            res.status(500).send({ message: e });
        }
    },

    async getUserById(req, res) {
        const ID = req.params.id;
        try {
            let result = await db.users.findAll({
                where: {
                    id: ID
                }
            });
            res.status(200).send(result);
        } catch (e) {
            res.status(500).send({ message: e });
        }
    },

    async updateUser(req, res) {
        const currentID = req.params.id;
        const updateData = req.body;
        if (!updateData.username || !updateData.name || !updateData.email || !updateData.phoneNumber || !updateData.address) {
            res.status(400).send({ message: "Content can't be empty!" });
            return;
        }

        let findInDB = await db.users.findAll({
            where: {
                [Op.or]: [{ username: updateData.username }, { name: updateData.name }, { email: updateData.email }, { phoneNumber: updateData.phoneNumber }]
            }
        });

        if (findInDB.length != 0) {
            res.status(406).send({ message: "Can't update infomation because the given information is already exist!" });
        } else {
            try {
                await db.users.update(
                    {
                        username: updateData.username,
                        name: updateData.name,
                        email: updateData.email,
                        phoneNumber: updateData.phoneNumber,
                        address: updateData.address
                    },
                    {
                        where: {
                            id: currentID
                        }
                    }
                );
                res.status(201).send({ message: 'Update user successfully!' });
            } catch (e) {
                res.status(500).send({ message: e });
            }
        }
    },

    async deleteUser(req, res) {
        const currentID = req.params.id;
        try {
            await db.users.destroy({
                where: {
                    id: currentID
                }
            });

            res.status(201).send({ message: 'Delete user successfully!' });
        } catch (e) {
            res.status(500).send({ message: e });
        }
    },

    async login(req, res) {
        const userInput = req.body;

        if(!userInput.email || !userInput.password) {
            res.status(400).send({message: "Content can't be empty!"});
            return;
        }

        let user = await db.users.findOne({
            where: {
                [Op.or]: {email: userInput.email}
            }
        });

        if(Object.keys(user).length === 0) {
            res.status(406).send({message: "Email not found!"});
        } else {
            const match = await bcrypt.compare(userInput.password, user.password);

            if(match) {
                res.send({
                    username: user.username,
                    email: user.email,
                    role_id: user.role_id,
                    token: generateToken(user.id)
                });
            } else {
                res.status(406).send({message: "Password is not correct!"});
            }
        }
    }
}

module.exports = UserController;