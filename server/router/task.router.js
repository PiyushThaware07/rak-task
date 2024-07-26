const express = require("express");
const router = express.Router();


// Controllers
const taskController = require("../controller/task.controller");

// Routing
router.route("/").get(taskController.getAll);
router.route("/:id?").get(taskController.get);
router.route("/").post(taskController.create);
router.route("/:id?").put(taskController.updateById);
router.route("/:id?").delete(taskController.deleteById);

module.exports = router;