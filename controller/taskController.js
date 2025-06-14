const createHttpError = require("http-errors");
const Task = require("../model/task");

const createTask = async (req, res, next) => {
  try {
    const { title, description, dueDate } = req.body;

    //validation is within the model schema, so we don't need to validate again here

    // Create new task
    const newTask = new Task({
      title,
      description,
      dueDate,
      createdBy: req.user._id,
      state: "pending",
    });

    await newTask.save();

    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    next(error);
  }
};



const getUserTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ createdBy: req.user._id }).sort({
      createdAt: -1,
    });
    if (!tasks || tasks.length === 0) {
      return next(createHttpError(404, "No tasks found for this user"));
    }
    res.status(200).json({ message: "User tasks retrieved successfully", tasks });
  } catch (error) {
    next(error);
  }
}

const editTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { title, description, dueDate, state } = req.body;

    // Find the task by ID and ensure it belongs to the user
    const task = await Task.findOneAndUpdate(
      { _id: taskId, createdBy: req.user._id },
      { title, description, dueDate, state },
      { new: true, runValidators: true }
    );

    if (!task) {
      return next(createHttpError(404, "Task not found or does not belong to user"));
    }

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    next(error);
  }
};  

const deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;

    // Find the task by ID and ensure it belongs to the user
    const task = await Task.findOneAndDelete({ _id: taskId, createdBy: req.user._id });

    if (!task) {
      return next(createHttpError(404, "Task not found or does not belong to user"));
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createTask,
  getUserTasks,
  editTask,
  deleteTask
};
// This code defines a task controller for a todo application using Express.js.};