const request = require('request')
const geocode = require('./geocode')

const forecast = (latitude, longitude, callback) => {
    
    //geocode()    
    
    const url = 'http://api.weatherstack.com/current?access_key=a539a52e571fe7aa3b64feb5e9e09b33&query=' + latitude + ',' + longitude + '&units=m'

    // http://api.weatherstack.com/current?access_key=a539a52e571fe7aa3b64feb5e9e09b33&query=New%20York
    // http://api.weatherstack.com/current?access_key=a539a52e571fe7aa3b64feb5e9e09b33&query=37.8267,-122.4233&units=f
    // http://api.weatherstack.com/current?access_key=a539a52e571fe7aa3b64feb5e9e09b33&query=-75.7088,44.1545&units=f

    request({ url: url, json:true },(error, response) => {
        if(error) {
            callback('There are problems accessing the weather service',undefined)
        } else if(response.body.error) {
            callback('Location cannot be found',undefined)
        } else {
            callback(undefined, 'It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out')
    }})
}

module.exports = forecast