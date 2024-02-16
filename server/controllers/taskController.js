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
  const { id } = req.params;
  const { title, description, completed } = req.body;
  if (!title || !description)
    return next(new AppError(`All fields are required`, 400));

  const { rows } = await pool.query(
    "UPDATE tasks SET title = $1, description = $2, completed = $3 WHERE id = $4 RETURNING *",
    [title, description, completed, id]
  );
  if (rows.length === 0)
    return next(new AppError(`Invalid, id not exist: ${id}`, 404));

  res.status(200).json({ status: "success", task: rows[0] });
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
