const userRouter = require('./user.route');
const productRouter = require('./product.route');

function route(app) {
    app.use('/api/user', userRouter);
    app.use('/api/product', productRouter);
}

module.exports = route;