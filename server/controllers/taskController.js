const pool = require("../config/db");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllTask = catchAsync(async (req, res) => {
  const tasks = await pool.query("SELECT * FROM tasks order by id desc");
  res.status(200).json({ status: "success", tasks: tasks.rows });
});

exports.getATask = catchAsync(async (req, res, next) => {
  const tasks = await pool.query(
    `SELECT * FROM tasks WHERE id = ${req.params.id}`
  );
  if (tasks.rows.length === 0)
    return next(new AppError(`Invalid, id not exist: ${req.params.id}`, 404));
  res.status(200).json({ status: "success", task: tasks.rows[0] });
});

exports.postTask = catchAsync(async (req, res, next) => {
  const { title, description, completed = false } = req.body;
  if (!title || !description)
    return next(new AppError(`All fields are required`, 400));

  const newTask = await pool.query(
    "INSERT INTO tasks (title, description,completed) VALUES($1, $2,$3) RETURNING *",
    [title, description, completed]
  );
  res.status(201).json({ status: "success", task: newTask.rows[0] });
});

exports.updateTask = catchAsync(async (req, res, next) => {
  const tasks = await pool.query(
    `SELECT * FROM tasks WHERE id = ${req.params.id}`
  );
  if (tasks.rows.length === 0)
    return next(new AppError(`Invalid, id not exist: ${req.params.id}`, 404));

  // Construct the SET clause dynamically based on the fields in req.body
  const setClauses = Object.keys(req.body)
    .filter(key => ["title", "description", "completed"].includes(key)) // Ensure only allowed fields are updated
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");

  const values = Object.values(req.body);

  // Add the id parameter for the WHERE clause
  values.push(req.params.id);

  // Construct the UPDATE query dynamically with the SET clause and parameters
  const query = `UPDATE tasks SET ${setClauses} WHERE id = $${values.length} RETURNING *`;

  const updateTask = await pool.query(query, values);
  res.status(200).json({ status: "success", task: updateTask.rows[0] });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
  const tasks = await pool.query(
    `SELECT * FROM tasks WHERE id = ${req.params.id}`
  );
  if (tasks.rows.length === 0)
    return next(new AppError(`Invalid, id not exist: ${req.params.id}`, 404));

  const deleteTask = await pool.query(
    "DELETE FROM tasks WHERE id=$1 RETURNING *",
    [req.params.id]
  );
  res.status(200).json({ status: "success", task: deleteTask.rows[0] });
});
