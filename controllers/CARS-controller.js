const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const getAllCars = (req, res) => {
  
  pool.query("SELECT * FROM CARS", (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getCarsByID = (req, res) => {
// SELECT USERS WHERE ID = <REQ PARAMS ID>
// ************************
  let id = req.params.id;//specially get id from the request parameter 
 
  let sql = "SELECT * FROM CARS WHERE ID = ?" // the "?" is what the user type in
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [id]) 

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createCar = (req, res) => {
  let body = req.body
  console.log(body)

  let sql = "INSERT INTO CARS (VIN, MAKE, MODEL, YEAR) VALUES (?,?,?,?);"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [body.VIN,body.MAKE,body.MODEL, body.YEAR])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

const updateCarByID = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  let body = req.body
  let id = req.params.id;//specially get id from the request parameter 
  // *****************************************
  let sql = "UPDATE CARS SET VIN = ?, MAKE = ?, MODEL =?,YEAR =? WHERE id =?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [body.VIN,body.MAKE,body.MODEL, body.YEAR, id]) //id = condition

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteCarByID = (req, res) => {

  let id = req.params.id;//specially get id from the request parameter 

  let sql = "DELETE FROM CARS WHERE id = ?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    console.log(results)
    
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  })
}

module.exports = {
  getAllCars,
  getCarsByID,
  createCar,
  updateCarByID,
  deleteCarByID
}