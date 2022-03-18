const express = require("express")
const https = require("https")
const res = require("express/lib/response")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html")
    //res.send("server is running")
})

app.post("/", function(req, res){
    console.log(req.body.cityName)
    const apiKey = "46c418bc7941efb0006514e64d261542"
    const query = req.body.cityName
    const units = "metric"
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${query}&units=${units}`
    https.get(url, function(response){
        console.log(response.statusCode)
        response.on("data", function(data){
        const weatherData = JSON.parse(data)
        const location = weatherData.name
        const description = weatherData.weather[0].description
        const temperature = weatherData.main.temp
        const icon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
            console.log(description)
            res.set("Content-Type", "text/html")
            res.write(`<h2>El estado del tiempo es: ${description}</h2>`)
            res.write(`<h1>la temperatura en ${location} es de ${temperature} º</h1><img src='${icon}'>`)
            res.send()
        })
    })
})

app.listen(3000, function(){
    console.log("server is running on port 3000")
})




