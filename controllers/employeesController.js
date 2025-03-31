const data = {
  employees: require("../model/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};
const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const createNewEmployee = (req, res) => {
  const newEmployee = {
    id: data.employees?.length
      ? data.employees[data.employees.length - 1].id + 1
      : 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res
      .status(400)
      .json({ message: "First and last names are required." });
  }
  const duplicate = data.employees.find(
    (employee) =>
      employee.firstname === newEmployee.firstname &&
      employee.lastname === newEmployee.lastname
  );
  if (duplicate) return res.sendStatus(409); // Conflict

  data.setEmployees([...data.employees, newEmployee]);
  res.status(201).json(data.employees);
};

const updateEmployeee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee)
    return res
      .status(400)
      .json({ message: `Employee Id ${req.body.id} not found` });

  if (req.body.firstname)
    employee.firstname ? req.body.firstname : employee.firstname;
  if (req.body.lastname)
    employee.lastname ? req.body.lastname : employee.lastname;
  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  const unsortedArray = [...filteredArray, employee];
  data.setEmployees(
    undortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  /*   res.json({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  }); */
};

const deleteEmployee = (req, res) => {
  res.json({
    id: req.body.id,
  });
};

const getEmployee = (req, res) => {
  res.json({ id: req.params.id });
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployeee,
  deleteEmployee,
  getEmployee,
};
