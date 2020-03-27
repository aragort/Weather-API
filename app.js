const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

  const query = req.body.cityName;
  const apiKey = "43c523354d361dfde05eac6cbf5bfdee";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit
  https.get(url, function(response) {

    console.log(response);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p> The weather is " + weatherDescription + " <p> ");
      res.write("<h1> The temperature in " + query + " is " + temp + " degrees celcius.</h1>");
      res.write("<image src=" + imageURL + "> ");
      res.send();
    })

  });
})

//res.send("Server working")

//////////


app.listen(3000, function() {
  console.log("Server is running on port 3000")
})