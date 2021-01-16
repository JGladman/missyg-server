const mysql = require('mysql')

const uuid = require('uuid')

const config = require('./index').config

const getItems = (req, res) => {
  const connection = mysql.createConnection(config)

  const items = []

  connection.query('SELECT * FROM items', (err, result, fields) => {
    if (err) throw err
    res.send(result)
  })

  connection.end()
}

const getItemById = (req, res) => {
  const { id } = req.body

  const connection = mysql.createConnection(config)

  connection.query(
    `SELECT * FROM items WHERE id='${id}'`,
    (err, result, fields) => {
      if (err) throw err
      res.send(result)
    },
  )

  connection.end()
}

const addItem = (req, res) => {
  const { name } = req.body
  const id = uuid.v4()

  const connection = mysql.createConnection(config)

  connection.query(
    `INSERT INTO items (id, name) VALUES ("${id}", "${name}")`,
    (err, result, fields) => {
      if (err) throw err
      res.send(result)
    },
  )

  connection.end()
}

const updateItem = (req, res) => {
  const { id, name } = req.body

  const connection = mysql.createConnection(config)

  connection.query(
    `
        UPDATE items
        SET name='${name}'
        WHERE id='${id}';
    `,
    (err, result, fields) => {
      if (err) throw err
      res.send(result)
    },
  )

  connection.end()
}

const deleteItem = (req, res) => {
  const { id } = req.body

  const connection = mysql.createConnection(config)

  connection.query(
    `
        DELETE FROM items
        WHERE id='${id}';
    `,
    (err, result, fields) => {
      if (err) throw err
      res.send(result)
    },
  )

  connection.end()
}

module.exports = {
  getItems,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
}
