const taskRouter = require("express").Router();
const { createTask, getUserTasks, editTask, deleteTask } = require("../controller/taskController");

taskRouter.post("/", createTask);
taskRouter.get("/", createTask); // for browser requests to render create task page
taskRouter.get("/", getUserTasks);
taskRouter.patch("/:taskId", editTask);
taskRouter.get("/:taskId", editTask); //
taskRouter.delete("/:taskId", deleteTask);

module.exports = taskRouter;
