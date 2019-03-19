'use strict'

/* global fetch Handlebars Chart */

const myTable = document.querySelector('#myTable')
const myChartCtx = document.querySelector('#myChart')
let newData = null

function refresh () {
  fetch('/sensors', {
    method: 'get',
    headers: {
      'Accept': 'application/json'
    }}).then((response) => {
      response.json().then((data) => {
        newData = data
        justAddedData(data)
        makeMyChart(data)
        document.getElementById('48hrs').addEventListener('click', getData48Hrs)
        document.getElementById('24hrs').addEventListener('click', getData24Hrs)
        document.getElementById('1hrs').addEventListener('click', getData1Hrs)
      })
    })
}

refresh()
const interval = setInterval(refresh, 10000)

function justAddedData (data) {
  if (newData != null) {
    newData.push(data[data.length - 1])
  }
}

function getData48Hrs () {
  getDataFromHrs(48)
}

function getData24Hrs () {
  getDataFromHrs(24)
}

function getData1Hrs () {
  getDataFromHrs(1)
}

function getDataFromHrs (hours) {
  const msPerHours = (60000 * 60 * hours)
  const today = Date.now()
  const time = new Date(today - msPerHours).toISOString()

  const times = []

  for (let t of newData) {
    if (t.time >= time) {
      times.push(t)
    }
  }

  myTable.innerHTML = Handlebars.templates.sensors({sensors: times})
}

function makeMyData (data) {
  const labels = []
  const humidity = []
  const temperature = []
  for (let c of data) {
    labels.push(c.time)
    humidity.push(c.humidity)
    temperature.push(c.temperature)
  }
  return { labels, humidity, temperature }
}

function makeMyChart (data) {
  const myData = makeMyData(data)
  const myChart = new Chart(myChartCtx, {
    type: 'line',
    data: {
      labels: myData.labels,
      datasets: [{
        label: 'Humidity',
        data: myData.humidity,
        backgroundColor: 'blue',
        fill: false
      }, {
        label: 'Temperature',
        data: myData.temperature,
        backgroundColor: 'orange',
        fill: false
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Humidity and Temperature'
      },
      responsive: true,
      animation: {
        duration: 0
      }
    }
  })
}
