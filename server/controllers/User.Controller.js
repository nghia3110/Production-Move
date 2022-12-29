const db = require('../models/index.js');
const bcrypt = require('bcrypt');
const { Op, QueryTypes } = require('sequelize');
const generateToken = require('../utils/generateToken.js');

const UserController = {
    async create(req, res) {
        const userData = req.body;
        if (!userData.password || !userData.name || !userData.phoneNumber || !userData.address || !userData.role || !userData.email) {
            res.status(400).send({
                message: "Content can't be empty!"
            });
            return;
        }

        let findInDB = await db.users.findAll({
            where: {
                [Op.or]: [{ name: userData.name }, { email: userData.email }]
            }
        });

        if (findInDB.length != 0) {
            res.status(406).send({ message: "There is an account registered with given information. Please check username, phoneNumber or email!" });
        } else {
            try {
                const hashPassword = await bcrypt.hash(userData.password, 10);
                const User = {
                    name: userData.name,
                    password: hashPassword,
                    email: userData.email,
                    phoneNumber: userData.phoneNumber,
                    address: userData.address,
                    role: userData.role,
                    status: 'Đã kiểm duyệt'
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
            let result = await db.users.findAll({
                where: {
                    [Op.not]: [{role: 'Quản trị viên'}]
                },
                attributes: {
                    exclude: ['password']
                }
            });
            res.status(200).send(result);
        } catch (e) {
            res.status(500).send({ message: e });
        }
    },

    async getUserProfile(req, res) {
        res.status(200).send(req.user);
    },

    async updateUser(req, res) {
        const currentID = req.user.id;
        const updateData = req.body;
        if (!updateData.name || !updateData.email || !updateData.phoneNumber || !updateData.address) {
            res.status(400).send({ message: "Content can't be empty!" });
            return;
        }

        let findInDB = await db.users.findAll({
            where: {
                [Op.or]: [{ name: updateData.name }, { email: updateData.email }]
            }
        });

        if (findInDB.length != 0) {
            res.status(406).send({ message: "Can't update infomation because the given information is already exist!" });
        } else {
            try {
                await db.users.update(
                    {
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

        if(user) {
            const match = await bcrypt.compare(userInput.password, user.password);

            if(match) {
                let token = generateToken(user.id);
                res.send({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    address: user.address,
                    phoneNumber: user.phoneNumber,
                    role: user.role,
                    token: token,
                    status: user.status
                });
            } else {
                res.status(406).send({message: "Password is not correct!"});
            }
        } else {
            res.status(406).send({message: "Email not found!"});
        }
    }
}

module.exports = UserController;