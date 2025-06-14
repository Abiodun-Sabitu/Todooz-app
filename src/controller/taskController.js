const createHttpError = require("http-errors");
const Task = require("../model/task");
const { isBrowserRequest } = require("../utils/isBrowserRequest");

const createTask = async (req, res, next) => {
  try {


      // If browser, redirect to dashboard
    if (req.method === "GET" && isBrowserRequest(req)) {
      // Render the addTask.pug form
      return res.render("createTask", { user: req.user });
    }

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

       // If browser, redirect to dashboard
    if (isBrowserRequest(req)) {
      // Render the addTask.pug form
      return res.redirect("/api/v1/dashboard");
    }
    // If API request, return JSON response
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

    // If browser request, render the dashboard with tasks
    if (isBrowserRequest(req)) {
      return res.render("dashboard", { user: req.user, tasks });
    }
    

    // If API request, return JSON response
    if (!tasks || tasks.length === 0) {
      return next(createHttpError(404, "No tasks found for this user"));
    }
    res
      .status(200)
      .json({ message: "User tasks retrieved successfully", tasks });
  } catch (error) {
    next(error);
  }
};

const editTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;

    // If GET and browser: render the edit form
    if (req.method === "GET" && isBrowserRequest(req)) {
      const task = await Task.findOne({ _id: taskId, createdBy: req.user._id });
      if (!task) {
        return next(
          createHttpError(404, "Task not found or does not belong to user")
        );
      }
      return res.render("editTask", { user: req.user, task });
    }

    // If PATCH (API or browser form submission)
    if (req.method === "PATCH") {
      const { title, description, dueDate, state } = req.body;
      const task = await Task.findOneAndUpdate(
        { _id: taskId, createdBy: req.user._id },
        { title, description, dueDate, state },
        { new: true, runValidators: true }
      );

      if (!task) {
        return next(
          createHttpError(404, "Task not found or does not belong to user")
        );
      }
      // If browser, redirect to dashboard
      if (isBrowserRequest(req)) {
        return res.redirect("/api/v1/dashboard");
      }

      res.status(200).json({ message: "Task updated successfully", task });
    }

    // Method not allowed
    next(createHttpError(405, "Method Not Allowed"));
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;

    // Find the task by ID and ensure it belongs to the user
    const task = await Task.findOneAndDelete({
      _id: taskId,
      createdBy: req.user._id,
    });

    if (!task) {
      return next(
        createHttpError(404, "Task not found or does not belong to user")
      );
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
  deleteTask,
};
// This code defines a task controller for a todo application using Express.js.};
