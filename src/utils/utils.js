const request = require('request')

const geocode = (address,cb) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2hhcm1pYmFuZXJqZWUiLCJhIjoiY2swbHF3aHA4MHdidzNsbGk5OXdhbDQ0biJ9.2RvyS9foTpmGIIUSfRz8MQ&limit=1'

    request({ url, json:true }, (error,{body}) =>{
        if(error) {
           cb('unable to connect to geo api', undefined)
        } else if(body.features.length === 0) {
            cb('unable to find location', undefined)
        } else {
                const lat = body.features[0].center[1]
                const long = body.features[0].center[0]
                const location = body.features[0].place_name
                cb(undefined,{
                    lat,
                    long,
                    location
                })
        }
    })
}

const forecast = (lat, long, cb) => {
    const url = 'https://api.darksky.net/forecast/e3168a9ac2c75958ce75f1f18b619105/'+lat+','+long+'?units=si'
  
     request({ url, json:true }, (error,{body}) =>{
       if(error){
           cb('unable to connect to weather api', undefined)
       } else if (body.error){
           cb('unable to find weather', undefined)
       } else {
          // const body = response.body
           cb(undefined, body.daily.data[0].summary+" It is currently "+body.currently.temperature+" degrees out. There is a "+body.currently.precipProbability+"% chance of rain")
       }
     }) 
  }

module.exports = {
    'geocode' : geocode,
    'forecast' : forecast
}