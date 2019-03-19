'use strict'
const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const Sensors = require('../db/db').Sensors
const sensorLib = require('node-dht-sensor')

// Dht sensor
sensorLib.initialize(22, 12)

const app = express()
const port = 3000

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, '../views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, '../views'))

app.use((request, response, next) => {
  console.log(request.url)
  next()
})

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, '../public')))

app.get('/sensors', (request, response, next) => {
  if (request.accepts('application/json') && !request.accepts('text/html')) {
    Sensors.all((err, data) => {
      if (err) return next(err)
      response.contentType('application/json')
      response.end(JSON.stringify(data))
    })
  }
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(port, (err) => {
  if (err) return console.error(`An error occurred: ${err}`)
  console.log(`Listening on http://localhost:${port}/`)
})

//
const interval = setInterval(() => {
  sensorLib.read(22, 12, function (err, temperature, humidity) {
    if (err) exit(err)

    const sensorData = {
      time: new Date().toISOString(),
      temperature: temperature.toFixed(2),
      humidity: humidity.toFixed(2)
    }

    Sensors.insert(sensorData, (err) => {
      if (err) exit(err)
    })
  })
}, 10000)

/*
Function to shut down the system.
*/
function exit (err) {
  if (err) console.log('An error occurred: ' + err)
  clearInterval(interval)
  console.log('Untill next time.')
  process.exit()
}
process.on('SIGINT', exit)
