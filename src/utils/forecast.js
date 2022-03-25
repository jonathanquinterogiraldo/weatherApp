const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=0d18fcb81f4600764bf1c518c72a84ec&query='+latitude+','+longitude+'&units=m'

    request({ url, json: true }, (error, { body }) => {
        if (error){
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error){
            callback('Unable to find weather. Try another search', undefined)

        } else {
            
            callback(undefined,`Current temperature is ${body.current.temperature} degrees out. Weather description is ${body.current.weather_descriptions[0]}, and humidity ${body.current.humidity}`)
        }
    })
}

module.exports = forecast