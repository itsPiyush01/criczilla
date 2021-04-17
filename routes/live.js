const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get("/", (req, res) => {

    let content="Hi content"
    res.render("live",{searchedWord:"",content:content})
})

module.exports = router 