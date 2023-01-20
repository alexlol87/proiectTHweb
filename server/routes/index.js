import express from 'express';

import { studentsRouter } from './students.js';
import { activitiesRouter } from './activities.js';
import { loginRouter } from './login.js';
import { reactionsRouter } from './reactions.js';
import {teachersRouter} from "./teachers.js";

const router = express.Router();

router.use('/students', studentsRouter);
router.use('/activities', activitiesRouter);
router.use('/account', loginRouter)
router.use('/teachers', teachersRouter)
router.use('/reactions', reactionsRouter);
export { router as MainRouter };

//DOAMNE AJUTA