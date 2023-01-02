const { response } = require('express');
const express = require('express');
const routes = express.Router();
const fs = require('fs');
const path = require('path');
const main = require('../scrapfn/scrape'); 
routes.post('/indeed',async (req,res)=>{
    try{
        const {skill} = req.body;
        let scrap = await main(skill);
        return res.status(200).json({
            status:"ok",
            // list:scrap && typeof(scrap) === 'object' && scrap.list ? scrap.list : {}
            // to write this in short
            list:scrap?.list || {}
            //this means that is scrap is null than . operator should not work
        })
    }catch(e){
        return res.status(500).send(e);
    }
})
routes.get('/getData',async (req,res)=>{
    try{
        const jobs = path.join(__dirname,'../','job.json');
        return res.status(200).sendFile(jobs);
    }catch(e){
        return res.status(500).send(e);
    }
})
module.exports = routes;