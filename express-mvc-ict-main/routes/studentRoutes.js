const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// Define routes
router.get("/students", studentController.getStudents);
router.post("/students", studentController.createStudent);
router.get("/students/:id", studentController.getStudentById);
router.put("/students/:id", studentController.updateStudent);
router.delete("/students/:id", studentController.deleteStudent);

module.exports = router;
