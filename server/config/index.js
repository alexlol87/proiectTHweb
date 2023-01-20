// const {Sequelize} = require('sequelize');
import Sequelize from "sequelize";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './config/proiect_tehnologii_web.db'
})

export { sequelize }