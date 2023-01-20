import { Teacher } from './teacher.js'
import { Activity } from './activities.js'
import { Reaction } from './reactions.js'
import { Student } from './students.js'
import { StudentActivity } from './studentActivity.js'
import { sequelize } from "../config/index.js";

sequelize.options.logging = false

Student.belongsToMany(Activity, { through: StudentActivity })
Activity.belongsToMany(Student, { through: StudentActivity })

try {
    await sequelize.sync({ alter: true })
        .then(() => {
            console.log('Db created');
        })
    // await Teacher.sync({ alter: true });
    // await Activity.sync({ alter: true });
    // await Reaction.sync({ alter: true });
    // await Student.sync({ alter: true });
    // await StudentActivity.sync({ alter: true });
} catch (e) {
    console.log(e)
}
sequelize.options.logging = true
export { Teacher, Activity, Reaction, Student, StudentActivity }
