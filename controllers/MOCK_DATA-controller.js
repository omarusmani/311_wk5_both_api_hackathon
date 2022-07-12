const mysql = require("mysql");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const getAllUsers = (req, res) => {
  console.log("inside get all users route");
  // SELECT ALL USERS
  pool.query("SELECT * FROM MOCK_DATA;", (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const getUserById = (req, res) => {
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  let id = req.params.id;
  try {
    let sql = "SELECT * FROM ?? WHERE ?? = ?";
    // WHAT GOES IN THE BRACKETS
    sql = mysql.format(sql, ["MOCK_DATA", "id", +id]);

    pool.query(sql, (err, rows) => {
      if (err) return handleSQLError(res, err);
      if (rows.length === 0) {
        res
          .status(500)
          .send(`Uh oh, we couldn't find a specific item with id ${id}`);
        return;
      }
      return res.json(rows);
    });
  } catch (e) {
    return handleSQLError;
  }
};

const createUser = (req, res) => {
  // INSERT INTO USERS FIRST AND LAST
  const { first_name, last_name, email, gender, ip_address } = req.body;
  let sql = "INSERT INTO ?? VALUES (null, ?, ?, ?, ?, ?)";
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [
    "MOCK_DATA",
    first_name,
    last_name,
    email,
    gender,
    ip_address,
  ]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ newId: results.insertId });
  });
};

const updateUserById = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  const { id } = req.params;
  const { body } = req;
  let sql = "UPDATE ?? SET ? WHERE ?? = ?;";
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ["MOCK_DATA", body, "id", id]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({
      affectedRows: results.affectedRows,
      message: results.message,
    });
  });
};

const deleteUserById = (req, res) => {
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  const { id } = req.params;
  let sql = "DELETE FROM ?? WHERE ?? = ?;";
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ["MOCK_DATA", "id", id]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
