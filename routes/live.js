const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/', async(req, res) => {
    try {
        const scoreAPI = await axios.get(`https://cricapi.com/api/matches?apikey=XK48y5FUGMcCRmUDe9p5iaSQQox2`)
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

module.exports = router 