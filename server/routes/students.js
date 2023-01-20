import express from 'express';
import * as studentsController from '../controllers/students.js'
// import {Activity} from "../models/activities.js";

const router = express.Router();

// middleware check if studentId is a number
const checkStudentId = (req, res, next) => {
    if (req.params.studentId && isNaN(req.params.studentId)) {
        res.status(400).json({message: 'Student id should be a number'});
    } else {
        next();
    }
};

router.get('/getAllStudents', studentsController.getAllStudents);
router.put('/updateStudent/:studentId', checkStudentId, studentsController.updateStudent);
router.delete('/deleteStudent/:studentId', checkStudentId, studentsController.deleteStudent);


export {router as studentsRouter};
