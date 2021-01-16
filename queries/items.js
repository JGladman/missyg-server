const uuid = require('uuid');

const updateQueryBuilder = require('./shared').updateQueryBuilder;
const makeQuery = require('./shared').makeQuery;

const getItems = (req, res) => {
  const query = 'SELECT * FROM items';
  makeQuery(query, res);
};

const getItemById = (req, res) => {
  const query = `SELECT * FROM items WHERE id='${req.body.id}'`;
  makeQuery(query, res);
};

const addItem = (req, res) => {
  const { name, description, category, stock, cost, details } = req.body;
  const id = uuid.v4();
  const query = `INSERT INTO items (id, name, description, category, stock, cost, details) VALUES ("${id}", "${name}", "${description}", "${category}", "${stock}", "${cost}", "${details}")`;
  makeQuery(query, res);
};

const updateItem = (req, res) => {
  if (!req.body.id) throw new Error('ERROR: ID must be defined');

  const fields = {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    stock: req.body.stock,
    cost: req.body.cost,
    details: req.body.details,
  };

  const query = updateQueryBuilder(req, req.body.id, fields, 'items');

  makeQuery(query, res);
};

const deleteItem = (req, res) => {
  const query = `DELETE FROM items WHERE id='${req.body.id}';`;
  makeQuery(query, res);
};

module.exports = {
  getItems,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
};
