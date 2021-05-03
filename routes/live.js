const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/', async(req, res) => {
    try {
        const scoreAPI = await axios.get(`https://cricapi.com/api/matches?apikey=lS7GGa6OdTeJvRYUyiBxBmxZnBs2`)
		res.render('live', { a : scoreAPI.data ,searchedWord:""})
		
        
    } catch (err) {
        if(err.response) {
            res.render('live', { a : null,searchedWord:"" })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.request) {
            res.render('live', { a : null,searchedWord:"" })
            console.log(err.request)
        } else {
            res.render('live', { a : null ,searchedWord:""})
            console.error('Error', err.message)
        }
    } 
})
router.get('/article/:id', async(req, res) => {
    let articleID = req.params.id;
    // live/article/1212
    console.log(articleID);

    // res.send(`<h1>${articleID}</h1>`)
    //ejslint views/livescoresingle.ejs
    try {
        
        const scoreAPI = await axios.get(`https://cricapi.com/api/cricketScore?apikey=lS7GGa6OdTeJvRYUyiBxBmxZnBs2&unique_id=${articleID}`)
        const fanAPI = await axios.get(`https://cricapi.com/api/fantasySummary?apikey=lS7GGa6OdTeJvRYUyiBxBmxZnBs2&unique_id=${articleID}`)
        res.render('livescoresingle', { article : scoreAPI.data , zarticle : fanAPI.data})
        
    } catch (err) {
        if(err.response) {
            res.render('livescoresingle', { article : null , zarticle: null})
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.requiest) {
            res.render('livescoresingle', { article : null , zarticle:null})
            console.log(err.requiest)
        } else {
            res.render('livescoresingle', { article : null,zarticle:null })
            console.error('Error', err.message)
        }
    } 
})
module.exports = router 