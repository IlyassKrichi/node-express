const Task = require("../models/task");
const asyncWrapper = require("../middleware/async");

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    res.status(201).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findById(taskID);
    if (!task) {
        res.status(404).json({ msg: "No Task with this id: " + taskID });
    }
    res.status(201).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findByIdAndUpdate(taskID, req.body, {
        new: true,
        runValidators: true,
    });
    if (!task) {
        res.status(404).json({ msg: "No Task with this id: " + taskID });
    }
    res.status(201).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findByIdAndDelete(taskID);
    if (!task) {
        res.status(404).json({ msg: "No Task with this id: " + taskID });
    }
    res.status(201).json({ task });
});

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
};