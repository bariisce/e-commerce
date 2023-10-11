const Sequelize = require('sequelize')

const sequelize = new Sequelize('node-app','root','AS160720',{
    dialect: 'mysql',
    host: 'localhost'
})

module.exports=sequelize