const Sequelize = require('sequelize')

const sequelize = require('../utility/database')

const Product = sequelize.define('product',
    {
        id:{
            type:Sequelize.INTEGER,
            autoIncrement: true,
            allownull:false,
            primaryKey:true
        },
        name:{
            type:Sequelize.STRING,
            allownull:false
        },
        price:{
            type:Sequelize.DOUBLE,
            allownull:false
        },
        imageUrl:{
            type:Sequelize.STRING,
            allownull:false
        },
        description:{
            type:Sequelize.STRING,
            allownull:true
        }
    }
)
module.exports=Product