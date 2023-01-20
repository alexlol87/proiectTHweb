import {DataTypes} from 'sequelize'
import {sequelize} from "../config/index.js";

const Student = sequelize.define('Student', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    faculty: {
        type: DataTypes.STRING,
        allowNull: false
    },
    group: {
        type: DataTypes.STRING,
        allowNull: false
    },
    series: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


export {Student}