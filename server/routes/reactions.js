import express from 'express';
import * as reactionsController from '../controllers/reactions.js'

const router = express.Router();


router.post('/createReaction', reactionsController.createReaction);
router.get('/getAllReactions', reactionsController.getAllReactions);
router.get('/getReactionByActivity/:activityId', reactionsController.getReactionByActivity);


export {router as reactionsRouter};
