const express= require("express");
const https=  require ("https");

const app= express();

app.get("/",function(req,res){
    const url="https://api.weatherapi.com/v1/current.json?key=c35855c5c3e241cfbc152706201910&q=Pune"
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData= JSON.parse(data);
            const temp= weatherData.current.temp_c;
            const weatherDescription=weatherData.current.condition.text
            console.log(temp);
            console.log(weatherDescription);
        })
    });
    
    res.send("Server Is Running");
});



app.listen(3000,function(req,res){
    console.log("Server is running on port 3000");
});