
import {Teacher} from '../models/teacher.js';
import {Activity} from "../models/index.js";

const getAllTeachers = async (req, res) => {
    let allTeachers = null;
    try {
        allTeachers = await Teacher.findAll();
        res.status(200).json(JSON.stringify(allTeachers));
    } catch (e) {
        console.log(e)
        res.status(500).json('Database error');
    }
};

const getTeacherById = async (req, res) => {
    let teacher = null;
    let {teacherId} = req.params
    try {
        teacher = await Teacher.findOne({
            where: {
                id: teacherId
            }
        })
        if (teacher !== null) {
            res.status(200).json(teacher)
        } else
            res.status(404).json('No teacher found with id ' + teacherId)
    } catch (e) {
        console.log(e)
        res.status(500).json('Server error')
    }
}
const updateTeacher = async (req, res) => {
    const {teacherId} = req.params;
    console.log(teacherId)
    if (teacherId) {
        const foundTeacher = await Teacher.findAll({where: {id: teacherId}});
        if (foundTeacher) {
            if (req.body.first_name) {
                await Teacher.update({first_name: req.body.first_name}, {
                    where: {
                        id: teacherId
                    }
                })
            }
            if (req.body.last_name) {
                await Teacher.update({last_name: req.body.last_name}, {
                    where: {
                        id: teacherId
                    }
                })
            }
            if (req.body.mail) {
                await Teacher.update({mail: req.body.mail}, {
                    where: {
                        id: teacherId
                    }
                })
            }
            if (req.body.department) {
                await Teacher.update({department: req.body.department}, {
                    where: {
                        id: teacherId
                    }
                })
            }
            res.status(202).json({message: 'Changes accepted.'});
        } else {
            res.status(404).json({err: 'Teacher not found.'});
        }
    } else {
        res.status(400).json({err: 'You must specify an id for the query.'});
    }
}

const deleteTeacherById = async (req, res) => {
    const {teacherId} = req.params;
    if (teacherId) {
        const foundTeacher = await Teacher.findAll({where: {id: teacherId}});
        if (foundTeacher) {
            await Activity.destroy({where: {teacherId: teacherId}})
            await Teacher.destroy({
                where: {
                    id: teacherId
                }
            })
            res.status(202).json({message: 'Deleted teacher.', teacher: foundTeacher});
        } else {
            res.status(404).json({message: "Couldn't find teacher."});
        }
    } else {
        res.status(400).json({err: 'You must specify an id for the query.'});
    }
};

const getTeacherByMail = async (req, res) => {
    const {mail} = req.params
    if (mail) {
        let teacher = await Teacher.findOne({
            where: {
                mail: mail
            }
        })
        if (teacher !== null) {
            res.status(200).json(teacher)
        } else {
            res.status(404).json('No teacher found')
        }
    } else {
        res.status(400).json('No mail')
    }
}

export {getAllTeachers, getTeacherById, updateTeacher, deleteTeacherById,getTeacherByMail};