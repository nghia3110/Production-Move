const db = require("../models");

const ProductController = {
    async getAllProduct(req, res) {
        try {
            const result = await db.products.findAll();
            res.send(200).send(result);
        } catch(e) {
            res.status(500).send({message: e});
        }
    },

    async add(req, res) {
        
    }
};

module.exports = ProductController;