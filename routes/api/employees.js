const express = require("express");
const router = express.Router();
const {
  getAllEmployees,
  createNewEmployee,
  updateEmployeee,
  deleteEmployee,
  getEmployee,
} = require("../../controllers/employeesController");

router
  .route("/")
  .get(getAllEmployees)
  .post(createNewEmployee)
  .put(updateEmployeee)
  .delete(deleteEmployee);

router.route("/:id").get(getEmployee);

module.exports = router;
