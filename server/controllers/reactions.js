
import {Reaction} from '../models/index.js';

const createReaction = async (req, res) => {
    try {
        if (req.body.type && req.body.activityId) {
            const {type, activityId} = req.body;
            const reaction = {type, activityId};
            Reaction.create(reaction)
            res.status(201).json(reaction);
        } else {
            res.status(404).json({message: 'Bad request.'});
        }
    } catch (err) {
        console.log(err);
    }
};

const getAllReactions = async (req, res) => {
    let allReactions = null;
    try {
        allReactions = await Reaction.findAll();
        res.status(200).json(JSON.stringify(allReactions));
    } catch (e) {
        console.log(e)
        res.status(500).json('Database error');
    }
};

const getReactionByActivity = async (req, res) => {
    const {activityId} = req.params;
    try {
        if (activityId) {
            const foundReactions = await Reaction.findAll({
                where:
                    {activityId: activityId}
            });
            if (foundReactions !== null) {
                res.status(200).json(foundReactions);
            } else {
                res.status(404).json({message: "Couldn't find reaction."});
            }
        } else {
            res.status(400).json({err: 'You must specify an id for the query.'});
        }
    } catch (e) {
        console.log(e)
        res.status(500).json('Server error');
    }
};

export {createReaction};
export {getAllReactions};
export {getReactionByActivity};


