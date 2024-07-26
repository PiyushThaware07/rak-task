const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, required: false, default: false }
})

const TaskModel = mongoose.model("task", TaskSchema);

module.exports = TaskModel;