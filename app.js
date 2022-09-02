require('dotenv').config();

const express = require('express');

const app = express();


const bodyParser = require('body-parser');

const ejs = require('ejs');

const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://saipranith:HaFkUhxKJsTELFRK@cluster0.htyqh.mongodb.net/ReviewDB");

const ReviewSchema = {
    name:{type:String,required:true},
    review:{type:String,required:true},
};

const Review = mongoose.model("review",ReviewSchema);

const apikey = process.env.API_KEY;



const axios = require('axios');

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');

app.use(express.static("public"));


app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.post("/",(req,res)=>{

    res.sendFile(__dirname+"/query.html");

    })

app.get("/query",(req,res)=>{
    res.sendFile(__dirname+"/query.html");
})

app.get("/contact",(req,res)=>{
    res.sendFile(__dirname+"/contact.html");
})

app.post("/res",(req,res)=>{
    const Sym = req.body.symbol;
    axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${Sym}&apikey=${apikey}`).then((response)=>{
        const d = response.data;
        const k = Object.keys(d);
        const l = response.data[k[1]];
        const m =Object.keys(l);
        const obj = l[m[1]];
        const kes = Object.keys(obj);
        const vals =[];
        kes.forEach(element => {
            vals.push(obj[element]);
        });
    res.render("data",{vals:vals,list:kes});
    })
})

app.post("/review",(req,res)=>{
    const rev = new Review({
        name:req.body.name,
        review:req.body.review,
    })
    if(req.body.name=="" || req.body.review==""){
        res.send("please fill both the feilds");

    }
    else{
    rev.save().then((data)=>{
        res.sendFile(__dirname+"/review.html");
    })
    .catch((err)=>{
        res.send("");
    })
    res.sendFile(__dirname+"/review.html");
}
})

app.listen(process.env.PORT||3000,()=>{
    console.log('listening to port 3000');
})