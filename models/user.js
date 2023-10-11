const Sequelize = require('sequelize')

const sequelize = require('../utility/database')

const User = sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    username:{
        type:Sequelize.STRING,
        unique:true
    },
    password:{
        type:Sequelize.STRING,
        allowNull:true
    },
    email:{
        type:Sequelize.STRING,
        allowNull:true,
        unique:true
    }
})


module.exports=User