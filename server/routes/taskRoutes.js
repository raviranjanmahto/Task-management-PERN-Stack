const router = require("express").Router();
const taskController = require("../controllers/taskController");

router.get("/", taskController.getAllTask);
router.get("/:id", taskController.getATask);
router.post("/add", taskController.postTask);
router.patch("/update/:id", taskController.updateTask);
router.delete("/remove/:id", taskController.deleteTask);

module.exports = router;
