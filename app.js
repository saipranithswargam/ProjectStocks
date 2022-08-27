const express = require('express');

const bodyParser = require('body-parser');

const ejs = require('ejs');

require('dotenv').config();


const apikey = process.env.API_KEY;

const app = express();

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
app.listen(process.env.PORT||3000,()=>{
    console.log('listening to port 3000');
})