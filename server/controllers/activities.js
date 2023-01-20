import {Activity} from '../models/index.js';
import {Op} from "sequelize";

const createActivity = async (req, res) => {
    try {
        if (req.body.name && req.body.description && req.body.start_date && req.body.end_date && req.body.teacherId) {
            const {name, description, start_date, end_date, teacherId} = req.body;
            const activity = {name, description, start_date, end_date, teacherId};
            await Activity.create({
                name: req.body.name,
                description: req.body.description,
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                teacherId: req.body.teacherId
            })
            res.status(201).json(activity);
        } else {
            res.status(500).json({message: 'Server error.'});
        }
    } catch (e) {
        console.log(e)
    }
};

const updateActivity = async (req, res) => {
    const {activityId} = req.params;
    if (activityId) {
        const foundActivity = await Activity.findAll({
            where: {
                id: activityId
            }
        });
        if (foundActivity) {
            if (req.body.description) {
                await Activity.update({description: req.body.description}, {
                    where: {
                        id: activityId
                    }
                })
            }
            if (req.body.start_date) {
                await Activity.update({start_date: req.body.start_date}, {
                    where: {
                        id: activityId
                    }
                })
            }
            if (req.body.end_date) {
                await Activity.update({end_date: req.body.end_date}, {
                    where: {
                        id: activityId
                    }
                })
            }
            if (req.body.name) {
                await Activity.update({name: req.body.name}, {
                    where: {
                        id: activityId
                    }
                })
            }

            res.status(202).json({message: 'Changes accepted.'});
        } else {
            res.status(404).json({err: 'Activity not found.'});
        }
    } else {
        res.status(400).json({err: 'You must specify an id for the query.'});
    }
};

//!Delete activity by id
const deleteActivity = async (req, res) => {
    const {activityId} = req.params;
    if (activityId) {
        const foundActivity = await Activity.findOne({
            where: {
                id: activityId
            }
        });
        if (foundActivity) {
            await Activity.destroy(
                {where: {id: activityId}}
            );
            res.status(202).json({message: 'Deleted activity.', activity: foundActivity});
        } else {
            res.status(404).json({message: "Couldn't find activity."});
        }
    } else {
        res.status(400).json({err: 'You must specify an id for the query.'});
    }
};


//!Select all activitati
const getAllActivities = async (req, res) => {
    try {
        let filteredActivities = await Activity.findAll();
        res.status(200).json(filteredActivities);
    } catch (e) {
        console.log(e)
    }
};

const getActivityByName = async (req, res) => {
    let foundActivity;
    try {
        if (req.params.name) {
            foundActivity = await Activity.findOne({
                where: {
                    name: req.params.name
                }
            });
            if (foundActivity !== null)
                res.status(200).json({
                    id: foundActivity.id,
                    name: foundActivity.name,
                    description: foundActivity.description,
                    start_date: foundActivity.start_date,
                    end_date: foundActivity.end_date,
                    teacherId: foundActivity.teacherId
                });
            else
                res.status(404).json('No activity found')
        } else
            res.status(400).json('Add name')
    } catch (e) {
        console.log(e)
        res.status(500).json("server error")
    }
};
//!Select toate activitatile care sunt active/ care nu s-au intamplat inca
const getActivitiesByDate = async (req, res) => {
    let {teacherId} = req.params
    try {
        const foundActivities = await Activity.findAll({
            where: {
                teacherId: teacherId,
                end_date: {
                    [Op.gt]: Date.now()
                }
            }
        });
        if (foundActivities) {
            //let todayDate = newDate.getDate()
            res.status(200).json( foundActivities);
        } else {
            res.status(404).json({message: "Couldn't find active activities."});
        }
    } catch (e) {
        console.log(e)
    }
};

const getActivitiesByTeacherId = async (req, res) => {
    let {teacherId} = req.params
    try {
        let activities = await Activity.findAll({
            where: {
                teacherId: teacherId
            }
        })
        if (activities.length > 0) {
            res.status(200).json(activities)
        } else {
            res.status(404).json('No activity found')
        }
    } catch (e) {
        console.log(e)
        res.status(500).json('Server error')
    }
}

export {
    createActivity,
    updateActivity,
    getAllActivities,
    deleteActivity,
    getActivityByName,
    getActivitiesByDate,
    getActivitiesByTeacherId
}
