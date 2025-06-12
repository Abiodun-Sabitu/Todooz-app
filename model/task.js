const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    enum: ['pending', 'completed', 'deleted'],
    default: 'pending'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
// This code defines a Mongoose schema for a task in a todo application.
// The task has a description, state, and a reference to the user who created it.