const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/', async(req, res) => {
    try {
        const newsAPI = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=31afab481c634b3f92197383dd096de8`)
        res.render('news', { a : newsAPI.data ,searchedWord:""})
        
    } catch (err) {
        if(err.response) {
            res.render('news', { a : null,searchedWord:"" })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.requiest) {
            res.render('news', { a : null,searchedWord:"" })
            console.log(err.requiest)
        } else {
            res.render('news', { a : null ,searchedWord:""})
            console.error('Error', err.message)
        }
    } 
})

module.exports = router 