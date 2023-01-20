import express from 'express';
import * as activitiesController from '../controllers/activities.js'

const router = express.Router();


// middleware check if activityId is a number
const checkActivityId = (req, res, next) => {
    if (req.params.activityId && isNaN(req.params.activityId)) {
        res.status(400).json({message: 'Activity id should be a number'});
    } else {
        next();
    }
};

router.post('/create', activitiesController.createActivity);
router.put('/update/:activityId', checkActivityId, activitiesController.updateActivity);
router.delete('/delete/:activityId', checkActivityId, activitiesController.deleteActivity);
router.get('/getAllActivities', activitiesController.getAllActivities);
router.get('/getActivitiesByDate/:teacherId', activitiesController.getActivitiesByDate);
router.get('/getActivityByName/:name', activitiesController.getActivityByName);
router.get('/getActivitiesByTeacherId/:teacherId', activitiesController.getActivitiesByTeacherId);

export {router as activitiesRouter};