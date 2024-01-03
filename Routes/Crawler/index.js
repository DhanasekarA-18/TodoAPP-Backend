const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const { URL } = require('url')

var router = express.Router()

router.get('/scrape', async (req, res) => {
  
  const baseUrl = 'https://www.tamildailycalendar.com'
  const defaultImg = 'tamil_daily_calendar.php'

  try {
    const url = `${baseUrl}/tamil_daily_calendar.php`
    const response = await axios.get(url)
    const { data } = response;
    const $ = cheerio.load(data)

    // current class name of the calendar Img
    const calendarImgSrc = $('.img-responsive').attr('src')
    let calendarImgUrl = ''
    if (calendarImgSrc) {
      calendarImgUrl = new URL(calendarImgSrc, baseUrl).href // Construct full image URL
    } else {
      calendarImgUrl = `${baseUrl}/${defaultImg}`
    }

    res.status(200).json({ success: true, imageUrl: calendarImgUrl })

  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

module.exports = router
