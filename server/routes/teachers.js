import express from 'express';
import * as teachersController from '../controllers/teachers.js'

const router = express.Router();

router.get('/getAllTeachers', teachersController.getAllTeachers);
router.get('/getTeacherById/:teacherId', teachersController.getTeacherById);
router.delete('/deleteTeacherById/:teacherId', teachersController.deleteTeacherById);
router.put('/updateTeacher/:teacherId', teachersController.updateTeacher);
router.get('/getTeacherByMail/:mail', teachersController.getTeacherByMail);

export {router as teachersRouter};