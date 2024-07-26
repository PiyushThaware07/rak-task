const TaskModel = require("../model/task.model");



// & GET
exports.getAll = async function (req, res) {
    try {
        const result = await TaskModel.find();
        return res.status(200).json({
            status: "success",
            message: result
        })
    }
    catch (error) {
        res.status(500).json({
            status: "failed",
            message: "Internal Server Error"
        })
    }
}


exports.get = async function (req, res) {
    try {
        const { id } = req.params;
        // check id present or not
        if (!id) {
            return res.status(400).json({
                status: "failed",
                message: "id not found"
            });
        }

        // Check if the ID exists in the database
        const task = await TaskModel.findById(id);
        if (!task) {
            return res.status(404).json({
                status: "failed",
                message: "Task not found"
            });
        }

        // Return the found task
        return res.status(200).json({
            status: "success",
            message: task
        });


    }
    catch (error) {
        res.status(500).json({
            status: "failed",
            message: "Internal Server Error"
        })
    }
}


// & POST
exports.create = async function (req, res) {
    try {
        const payload = req.body;
        if (!payload || Object.keys(payload).length === 0) {
            return res.status(400).json({
                status: "failed",
                message: "Payload is empty"
            })
        }

        // create new 
        const newResult = await TaskModel(payload);
        const saveResult = await newResult.save();
        return res.status(201).json({
            status: "success",
            message: saveResult
        })

    }
    catch (error) {
        res.status(500).json({
            status: "failed",
            message: "Internal Server Error"
        })
    }
}


// & PUT
exports.updateById = async function (req, res) {
    try {
        const { id } = req.params;
        const payload = req.body;

        // check id present or not
        if (!id) {
            return res.status(400).json({
                status: "failed",
                message: "id not found"
            });
        }

        // Update task by ID
        const updatedTask = await TaskModel.findByIdAndUpdate(id, payload, { new: true });

        if (!updatedTask) {
            return res.status(404).json({
                status: "failed",
                message: "Task not found"
            });
        }

        return res.status(200).json({
            status: "success",
            message: updatedTask
        });
    }
    catch (error) {
        res.status(500).json({
            status: "failed",
            message: "Internal Server Error: " + error.message
        });
    }
};


// & DELETE
exports.deleteById = async function (req, res) {
    try {
        const { id } = req.params;

        // check id present or not
        if (!id) {
            return res.status(400).json({
                status: "failed",
                message: "id not found"
            });
        }

        // check id is valid or not
        const task = await TaskModel.findById(id);
        if (!task) {
            return res.status(404).json({
                status: "failed",
                message: "Task not found, invalid task id"
            });
        }

        // Delete task by ID
        await TaskModel.findByIdAndDelete(id);

        return res.status(200).json({
            status: "success",
            message: "Task deleted successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            status: "failed",
            message: "Internal Server Error: " + error.message
        });
    }
};