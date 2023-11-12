const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.get("/", controller.getStudents);
//send data to our database
//add student to / route
router.post("/", controller.addStudent)
//for example /1 student
//id here is a parameter
router.get("/:id", controller.getStudentById)
// update student that already exists
router.put("/:id", controller.updateStudent);
//it's ok if it's the same path as the one above as long as these are two different methods/requests
//delete student
router.delete("/:id", controller.removeStudent);

module.exports = router;