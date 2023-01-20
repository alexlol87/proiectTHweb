import {DataTypes} from 'sequelize'
import {sequelize} from "../config/index.js";
import {Activity} from "./activities.js";


const Reaction = sequelize.define('Reaction', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    activityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Activity,
            key: 'id'
        }
    }
});

export {Reaction}