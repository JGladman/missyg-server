const pool = require('../index').pool;

const trailingComma = (fieldsRemaining, query) => {
  fieldsRemaining--;
  if (fieldsRemaining > 0) query += `, `;

  return [fieldsRemaining, query];
};

const updateQueryBuilder = (req, id, fields, table) => {
  let numFields = 0;

  Object.keys(req.body).forEach((key) => {
    if (key !== 'id') numFields++;
  });

  if (numFields === 0) throw new Error('ERROR: Must update at least one value');

  let query = `UPDATE ${table} SET `;

  Object.entries(fields).forEach(([field, value]) => {
    if (value) {
      query += `${field}='${value}'`;
      [numFields, query] = trailingComma(numFields, query);
    }
  });

  query += ` WHERE id='${id}';`;

  return query;
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

module.exports = { updateQueryBuilder, makeQuery };
