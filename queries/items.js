const mysql = require('mysql');

const uuid = require('uuid');

const pool = require('../index').pool;

const getItems = (req, res) => {
  pool.getConnection((err, conn) => {
    conn.query('SELECT * FROM items', (err, result, fields) => {
      if (err) throw err;
      res.send(result);
      conn.release();
    });
  });
};

const getItemById = (req, res) => {
  const { id } = req.body;

  pool.getConnection((err, conn) => {
    conn.query(
      `SELECT * FROM items WHERE id='${id}'`,
      (err, result, fields) => {
        if (err) throw err;
        res.send(result);
        conn.release();
      },
    );
  });
};

const addItem = (req, res) => {
  const { name } = req.body;
  const id = uuid.v4();

  pool.getConnection((err, conn) => {
    conn.query(
      `INSERT INTO items (id, name) VALUES ("${id}", "${name}")`,
      (err, result, fields) => {
        if (err) throw err;
        res.send(result);
        conn.release();
      },
    );
  });
};

const updateItem = (req, res) => {
  const { id, name } = req.body;

  pool.getConnection((err, conn) => {
    conn.query(
      `
        UPDATE items
        SET name='${name}'
        WHERE id='${id}';
      `,
      (err, result, fields) => {
        if (err) throw err;
        res.send(result);
        conn.release();
      },
    );
  });
};

const deleteItem = (req, res) => {
  const { id } = req.body;

  pool.getConnection((err, conn) => {
    conn.query(
      `
        DELETE FROM items
        WHERE id='${id}';
      `,
      (err, result, fields) => {
        if (err) throw err;
        res.send(result);
        conn.release();
      },
    );
  });
};

module.exports = {
  getItems,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
};
