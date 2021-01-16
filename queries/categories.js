const uuid = require('uuid');

const updateQueryBuilder = require('./shared').updateQueryBuilder;
const makeQuery = require('./shared').makeQuery;

const getCategories = (req, res) => {
  const query = 'SELECT * FROM categories';
  makeQuery(query, res);
};

const getCategoryById = (req, res) => {
  const query = `SELECT * FROM categories WHERE id='${req.body.id}'`;
  makeQuery(query, res);
};

const addCategory = (req, res) => {
  const { title } = req.body;
  const id = uuid.v4();
  const query = `INSERT INTO categories (id, title) VALUES ("${id}", "${title}")`;
  makeQuery(query, res);
};

const updateCategory = (req, res) => {
  const { id, title, count } = req.body;

  if (!id) throw new Error('ERROR: ID must be defined');

  const query = updateQueryBuilder(
    req,
    id,
    { title: title, count: count },
    'categories',
  );

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
