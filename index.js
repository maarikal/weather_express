const express = require('express');
const app = express();
/*
const path = require('path')
const fetch = require('node-fetch')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const key = 'd43b9bc94518afe99cb9ba423d828c5b';
let city = 'Tartu'
*/

app.get('/user/:username', (req, res) => {
    // get parameter data from address row
    let user = req.params.username;
    // use this data in template
    res.render('index.ejs', {username: user});
});

app.get('/demo', (req, res) => {
    res.render('index.ejs');
});

app.listen(3000, ()=> {
    console.log('Server started on http://localhost:3000');
});

/*
app.get('/', function (req, res) {
    fetch(`https://api.openweathermap.org/data/2.5/weatger?q=${
        city}&appid=${key}`)
        .then((response) => {
        return response.json()
    })
        .then((data) => {
        console.log(data);
    })
    res.render('index')
})

app.listen(3000)
*/