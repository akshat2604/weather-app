const request = require('request')
const access_key=  "27f5649d2e7fec814716e1305ff96dec";
const forecast = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=27f5649d2e7fec814716e1305ff96dec&query='+address;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,' It is currently ' + body.current.temperature+'out there');
        }
    })
}

module.exports = forecast