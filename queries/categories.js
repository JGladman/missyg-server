const mysql = require('mysql');

const uuid = require('uuid');

const trailingComma = require('./shared').trailingComma;
const makeQuery = require('./shared').makeQuery;

const getCategories = (req, res) => {
  const query = 'SELECT * FROM categories';
  makeQuery(query, res);
};

const getCategoryById = (req, res) => {
  const { id } = req.body;
  const query = `SELECT * FROM categories WHERE id='${id}'`;
  makeQuery(query, res);
};

const addCategory = (req, res) => {
  const { title } = req.body;
  const id = uuid.v4();
  const query = `INSERT INTO categories (id, title) VALUES ("${id}", "${title}")`;
  makeQuery(query, res);
};

const updateCategory = (req, res) => {
  let numFields = 0;

  Object.keys(req.body).forEach((key) => {
    if (key !== 'id') numFields++;
  });

  console.log('NUM FIELDS: ' + numFields);

  if (numFields === 0) throw new Error('ERROR: Must update at least one value');

  const { id, title, count } = req.body;

  if (!id) throw new Error('ERROR: ID must be defined');

  let query = `UPDATE categories SET `;

  if (title) {
    query += `title='${title}'`;
    [numFields, query] = trailingComma(numFields, query);
    console.log('NUM FIELDS: ' + numFields);
  }
  if (count) {
    query += `count='${count}'`;
    [numFields, query] = trailingComma(numFields, query);
  }
  query += ` WHERE id='${id}';`;

  makeQuery(query, res);
};

const deleteCategory = (req, res) => {
  const { id } = req.body;
  const query = `DELETE FROM categories WHERE id='${id}';`;
  makeQuery(query, res);
};

module.exports = {
  getCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
};
