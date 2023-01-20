import { DataTypes } from 'sequelize'
import { sequelize } from "../config/index.js";

const StudentActivity = sequelize.define('StudentActivity', {
});

export { StudentActivity }