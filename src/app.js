const path = require('path');
const express = require("express");
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geoCode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

console.log(path.join(__dirname, '../public'))
const viewPath = path.join(__dirname, '../template/views');
const viewPartials = path.join(__dirname, '../template/partials')

hbs.registerPartials(viewPartials);
app.use(express.static(path.join(__dirname, '../public')))

app.set('view engine', 'hbs');
app.set('views', viewPath)

app.get('', (request, response) => {
    response.render('index', {
        title: "Weather",
        name: "Suhail Tanwar"
    })
})

app.get('/help', (request, response) => {
    response.render('help', {
        title: "This help page",
        message: "This is help documentation."
    })
})

app.get('/weather', (request, response) => {
    console.log(request.query.address)
    const address = request.query.address;
    if (address) {

        geoCode(address, (error, respObj) => {
            if (error) {
                response.send({ error: "Please provide proper Address." })
            }
            else {
                forecast(respObj.latitude, respObj.longitude, (error, forCastData) => {
                    if (error) {
                        response.send({ error: "Please provide proper Address." })
                    } else {
                        response.send({ forcast: forCastData, location: request.query.address })
                    }
                });
            }
        })

        // response.send({
        //     location: 'Mumbai',
        //     forcast: 35
        // })
    } else {
        response.send({
            error: "Please provide address as query string."
        })
    }

})

app.get('/help/*', (req, resp) => {
    resp.render('Error', {
        errorMsg: 'Help page not found.'
    })
})

app.get('*', (req, resp) => {
    resp.render('Error', {
        errorMsg: '404 PAGE NOT FOUND'
    })
})

app.listen(port, () => {
    console.log("Web server is up on port" + port)
});