const express= require("express");
const https=  require ("https");
const bodyParser = require("body-parser"); 

const app= express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    
});
app.post("/",function(req,res){
   const apiKey="113a78f5ca86da9fdd6d9720ef81af47";
    const query=req.body.cityName;
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units=" + unit + "&appid="+apiKey;
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherData= JSON.parse(data);
            const temp=weatherData.main.temp;
            const weatherDescription=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            res.write("<p>Possibility of "+weatherDescription+"</p>");
            res.write("<img src='https://openweathermap.org/img/wn/"+icon+"@2x.png'></img>")
            res.write("<h1>Temprature in "+ query +" is "+temp+" Degree Celcius.</h1>");
    res.send();

        })
    });
});

    


app.listen(3000,function(req,res){
    console.log("Server is running on port 3000");
    console.log("And you are good to go");
});