const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9\s]+$/.test(v) && v.length > 0; // Ensure title is alphanumeric and not empty
        },
        message: "Title must be alphanumeric and cannot be empty",
      },
    },
    description: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return v.length > 0;
        },
        message: "Description cannot be empty",
      },
    },
    state: {
      type: String,
      enum: ["pending", "completed", "deleted"],
      default: "pending",
      required: true,
      validate: {
        validator: function (v) {
          return ["pending", "completed", "deleted"].includes(v);
        },
        message: "State must be one of pending, completed, or deleted",
      },
    },
    dueDate: {
      type: Date,
      required: true,
      validator: function (v) {
        if (!v) return false;
        const inputDate = new Date(v.setHours(0, 0, 0, 0));
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return inputDate >= today;
      },
      message:
        "Due date must be today or in the future and must be a valid date format (e.g., YYYY-MM-DD)",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
// This code defines a Mongoose schema for a Task model with fields for title, description, state, due date, and createdBy.
// It includes validation for each field, ensuring that the title and description are not empty, the state is one of the allowed values, and the due date is in the future. The createdBy field references a User model, establishing a relationship between tasks and users. The schema also includes timestamps for createdAt and updatedAt fields.
