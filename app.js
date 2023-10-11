const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
require('./grpc-app')
app.set('view engine', 'pug');
app.set('views', './views');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/shop');
const accountRoutes = require('./routes/account');

const errorController = require('./controllers/error');
const sequelize = require('./utility/database');

const Category = require('./models/category');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cartItem');
const Order = require('./models/order');
const OrderItem = require('./models/orderItem');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    store:new SequelizeStore({
        db:sequelize,
    }),
    resave: false,
    proxy:true,
    cookie: {maxAge: 360000}
}))
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    if(!req.session.user){
        return next()
    }
    User.findByPk(req.session.user.id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err);
        })
});

app.use('/admin', adminRoutes);
app.use(userRoutes);
app.use(accountRoutes);

app.use(errorController.get404Page);

Product.belongsTo(Category, { foreignKey: { allowNull: false } });
Category.hasMany(Product);

Product.belongsTo(User,{foreignKey:{allowNull:false}});
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

sequelize
    //.sync({ force: true })
    .sync()
        .then((result) => {
            console.log('connected to mysql')
            app.listen(3000)
        })
        .then(console.log("3000 portundan ayaklandı"))
        .catch((err) => {console.log(err)})
