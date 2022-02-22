const express = require('express')
const app = express()
const path = require('path')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(bodyParser.urlencoded({ extended: true }))

const key = 'd43b9bc94518afe99cb9ba423d828c5b';
let city = 'Tartu'

const getWeatherDataPromise = (url) => {
    return new Promise((resolve,  reject) => {
        fetch(url)
            .then(response => {
                return response.json()
            })
            .then(data => {
                let description = data.weather[0].description
                let city = data.name
                let temp = Math.round(parseFloat(data.main.temp)-273.15)
                let result = {
                    description: description,
                    city: city,
                    temp: temp,
                    error: null
                }
                resolve(result)
            })
            .catch(error => {
                reject(error)
            })
    })
}

app.all("/", function (req, res) {
    let city
    if(req.method == "GET") {
        city = "Tartu"
    }
    if(req.method == "POST") {
        city = req.body.cityname
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${
        city}&appid=${key}`
    getWeatherDataPromise(url)
        .then(data => {
            res.render("index", data)
        })
        .catch(error => {
            res.render("index", {error: "Problem with getting data, try again"})
        })
})


/* Ülesande 5 commitimmata kood enne app.all funktsiooni tegemist
app.get('/', function (req, res) {
    let city = "Tartu"
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${
        city}&appid=${key}`
        getWeatherDataPromise(url)
        .then(data => {
        res.render("index", data)
        })
})

app.post('/', function(req, res) {
    let city = req.body.cityname
    let url =`https://api.openweathermap.org/data/2.5/weather?q=${
        city}&appid=${key}`
    getWeatherDataPromise(url)
        .then(data => {
            res.render("index", data)
        })
})
 */

app.listen(3000)