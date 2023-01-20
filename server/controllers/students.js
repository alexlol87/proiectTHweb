import {Student} from '../models/index.js';

const getAllStudents = async (req, res) => {
    let allStudents = null;
    try {
        allStudents = await Student.findAll();
        res.status(200).json(JSON.stringify(allStudents));
    } catch (e) {
        console.log(e)
        res.status(500).json('Database error');
    }
};

//! Delete pe student dupa id
const deleteStudent = async (req, res) => {
    const {studentId} = req.params;
    if (studentId) {
        const foundStudent = await Student.findOne({
            where: {
                id: studentId
            }
        });
        if (foundStudent) {
            // const updatedStudents = Student.filter(
            //     (student) => student.id.toString() !== studentId.toString()
            // );
            await Student.destroy({where: {id: studentId}})
            // Student = updatedStudents;
            res.status(202).json({message: 'Deleted student.', student: foundStudent});
        } else {
            res.status(404).json({message: "Couldn't find student."});
        }
    } else {
        res.status(400).json({err: 'You must specify an id for the query.'});
    }
};

//!update la student
const updateStudent = async (req, res) => {
    const {studentId} = req.params;
    if (studentId) {
        const foundStudent = await Student.findOne({
            where: {
                id: studentId
            }
        });
        if (foundStudent) {
            if (req.body.first_name) {
                await Student.update({first_name: req.body.first_name}, {
                    where: {
                        id: studentId
                    }
                })
            }
            if (req.body.last_name) {
                await Student.update({last_name: req.body.last_name}, {
                    where: {
                        id: studentId
                    }
                })
            }
            if (req.body.mail) {
                await Student.update({mail: req.body.mail}, {
                    where: {
                        id: studentId
                    }
                })
            }
            if (req.body.password) {
                await Student.update({password: req.body.password}, {
                    where: {
                        id: studentId
                    }
                })
            }
            if (req.body.faculty) {
                await Student.update({faculty: req.body.faculty}, {
                    where: {
                        id: studentId
                    }
                })
            }
            if (req.body.group) {
                await Student.update({group: req.body.group}, {
                    where: {
                        id: studentId
                    }
                })
            }
            if (req.body.series) {
                await Student.update({series: req.body.series}, {
                    where: {
                        id: studentId
                    }
                })
            }
            if (req.body.year) {
                await Student.update({year: req.body.year}, {
                    where: {
                        id: studentId
                    }
                })
            }

            res.status(202).json({message: 'Changes accepted.'});
        } else {
            res.status(404).json({err: 'Student not found.'});
        }
    } else {
        res.status(400).json({err: 'You must specify an id for the query.'});
    }
};


export {getAllStudents, updateStudent, deleteStudent};