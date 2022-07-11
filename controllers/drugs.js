const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')
  

const getAllDrugs = (req, res) => {
  
  pool.query("SELECT * FROM DRUGS", (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getDrugsByID = (req, res) => {
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  // ************************
    let id = req.params.id;//specially get id from the request parameter 
   
    let sql = "SELECT * FROM DRUGS WHERE ID = ?" // the "?" is what the user type in
    // WHAT GOES IN THE BRACKETS
    sql = mysql.format(sql, [id]) 
  
    pool.query(sql, (err, rows) => {
      if (err) return handleSQLError(res, err)
      return res.json(rows);
    })
  }

  const createDrug = (req, res) => {
    let body = req.body
    console.log(body)
  
    let sql = "INSERT INTO DRUGS (GENERIC, BRAND, FDA_CODE) VALUES (?,?,?);"
    // WHAT GOES IN THE BRACKETS
    sql = mysql.format(sql, [body.GENERIC,body.BRAND,body.FDA_CODE])
  
    pool.query(sql, (err, results) => {
      if (err) return handleSQLError(res, err)
      return res.json({ newId: results.insertId });
    })
  }

  const updateDrugByID = (req, res) => {
    // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
    let body = req.body
    let id = req.params.id;//specially get id from the request parameter 
    // *****************************************
    let sql = "UPDATE DRUGS SET GENERIC = ?, BRAND = ?, FDA_CODE =? WHERE id =?"
    // WHAT GOES IN THE BRACKETS
    sql = mysql.format(sql, [body.GENERIC,body.BRAND,body.FDA_CODE, id]) //id = condition
  
    pool.query(sql, (err, results) => {
      if (err) return handleSQLError(res, err)
      return res.status(204).json();
    })
  }

  const deleteDrugByID = (req, res) => {

    let id = req.params.id;//specially get id from the request parameter 
  
    let sql = "DELETE FROM DRUGS WHERE id = ?"
    // WHAT GOES IN THE BRACKETS
    sql = mysql.format(sql, [id])
  
    pool.query(sql, (err, results) => {
      if (err) return handleSQLError(res, err)
      console.log(results)
      
      return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
    })
  }
module.exports = {
  getAllDrugs,
  getDrugsByID,
  createDrug,
  updateDrugByID,
  deleteDrugByID
}