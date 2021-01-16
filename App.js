const mysql = require('mysql')

const express = require('express')
const bodyParser = require('body-parser')
const pino = require('express-pino-logger')()
const cors = require('cors')

const items = require('./queries/items')

const app = express()
app.use(pino)
app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)

const port = 3001

app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and MySQL API' })
})

app.get('/items', items.getItems)
app.get('/items/:id', items.getItemById)
app.post('/items', items.addItem)
app.put('/items', items.updateItem)
app.delete('/items/:id', items.deleteItem)

app.listen(port, () =>
  console.log(`Express server is running on localhost:${port}`),
)
