const taskRouter = require("express").Router();
const { createTask, getUserTasks, editTask, deleteTask } = require("../controller/taskController");

taskRouter.post("/", createTask);
taskRouter.get("/", getUserTasks);
taskRouter.patch("/:taskId", editTask);
taskRouter.delete("/:taskId", deleteTask);

module.exports = taskRouter;
