const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const cors = require('cors');

const items = require('./queries/items');
const categories = require('./queries/categories');

const app = express();
app.use(pino);
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

const port = 3001;

app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and MySQL API' });
});

app.get('/items', items.getItems);
app.get('/items/:id', items.getItemById);
app.post('/items', items.addItem);
app.put('/items/:id', items.updateItem);
app.delete('/items/:id', items.deleteItem);

app.get('/categories', categories.getCategories);
app.get('/categories/:id', categories.getCategoryById);
app.post('/categories', categories.addCategory);
app.put('/categories/:id', categories.updateCategory);
app.delete('/categories/:id', categories.deleteCategory);

app.listen(port, () =>
  console.log(`Express server is running on localhost:${port}`),
);
