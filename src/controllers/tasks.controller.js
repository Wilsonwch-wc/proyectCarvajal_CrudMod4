import { Tasks } from "../model/tasks.js";
import logger from "../logs/logger.js";

async function getTasks(req, res) {
    const { userId } = req.user;
    try {
        const tasks = await Tasks.findAll({
            attributes: ['id', 'name', 'done'],
            order: [['name', 'ASC']],
            where: { userId }
        });
        res.json(tasks);
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: "Error server" });
    }
}

async function createTask(req, res) {
    const { userId } = req.user;
    const { name } = req.body;
    try {
        const task = await Tasks.create({
            name,
            userId,
        });
        res.json(task);
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: "Error server" });
    }
}

async function getTask(req, res) {
    const { userId } = req.user;
    const { id } = req.params;
    try {
        const task = await Tasks.findOne({
            attributes: ['name', 'done'],
            where: {
                id,
                userId
            }
        });
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: "Error server" });
    }
}

async function updateTask(req, res) {
    const { userId } = req.user;
    const { id } = req.params;
    const { name, done } = req.body;
    try {
        const task = await Tasks.update(
            { name, done },
            { where: { id, userId } }
        );
        if (task[0] === 0) return res.status(404).json({ message: "Task not found" });
        res.json({ message: "Task updated successfully" });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: "Error server" });
    }
}

async function taskDone(req, res) {
    const { userId } = req.user;
    const { id } = req.params;
    const { done } = req.body;
    try {
        const task = await Tasks.update(
            { done },
            { where: { id, userId } }
        );
        if (task[0] === 0) return res.status(404).json({ message: "Task not found" });
        res.json({ message: "Task updated successfully" });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: "Error server" });
    }
}

async function deleteTask(req, res) {
    const { userId } = req.user;
    const { id } = req.params;
    try {
        const task = await Tasks.destroy({ where: { id, userId } });
        if (task === 0) return res.status(404).json({ message: "Task not found" });
        res.json({ message: "Task deleted" });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: "Error server" });
    }
}

export default {
    getTasks,
    createTask,
    getTask,
    updateTask,
    taskDone,
    deleteTask,
};
