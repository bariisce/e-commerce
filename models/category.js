const Sequelize = require('sequelize')

const sequelize = require('../utility/database')

const Category = sequelize.define('category',{
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
    description:{
        type:Sequelize.STRING,
        allownull:true
    }
})
module.exports=Category