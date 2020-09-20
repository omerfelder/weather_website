const request = require('request')

const geocode = (address, callback) => {
    const mapboxURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoib21lcmZlbGRlciIsImEiOiJja2YyM3M3NnUweXl4MnJwNzc2bnl3dHBsIn0.CiyiucBT2PW42mSfHPgYvA&limit=1'

    request({ url: mapboxURL, json:true },(error, response) => {
        if(error) {
            callback('There are problems accessing the map box service',undefined)
        } else if(response.body.features.length === 0) {
            callback('Location cannot be found',undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
    }})
}

module.exports = geocode