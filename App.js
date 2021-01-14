const express = require('express');
const pino = require('express-pino-logger')();
const axios = require('axios')
const cors = require('cors')

const app = express()
app.use(pino)
app.use(cors())

const port = 3001

app.get('/', async (req, res) => {
    res.send("Hello world!")
});

app.listen(port, () =>
    console.log(`Express server is running on localhost:${port}`)
)