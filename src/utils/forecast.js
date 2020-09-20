const request = require('request')
const geocode = require('./geocode')

const forecast = (latitude, longitude, callback) => {
    
    //geocode()    
    
    const url = 'http://api.weatherstack.com/current?access_key=a539a52e571fe7aa3b64feb5e9e09b33&query=' + latitude + ',' + longitude + '&units=m'

    request({ url: url, json:true },(error, response) => {
        if(error) {
            callback('There are problems accessing the weather service',undefined)
        } else if(response.body.error) {
            callback('Location cannot be found',undefined)
        } else {
            callback(undefined, {
                temprature: response.body.current.temperature, 
                feelslike: response.body.current.feelslike, 
                wind: response.body.current.wind_speed})
    }})
}

module.exports = forecast