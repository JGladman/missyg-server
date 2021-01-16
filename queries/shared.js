const pool = require('../index').pool;

const trailingComma = (fieldsRemaining, query) => {
  fieldsRemaining--;
  if (fieldsRemaining > 0) query += `, `;

  return [fieldsRemaining, query];
};

const makeQuery = (query, res) => {
  pool.getConnection((err, conn) => {
    conn.query(query, (err, result, fields) => {
      if (err) throw err;
      res.send(result);
      conn.release();
    });
  });
};

module.exports = { trailingComma, makeQuery };
