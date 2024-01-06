var express = require('express')
var router = express.Router()
const axios = require('axios')
const { getDateImage } = require('../utils/dateFunctions')

router.get('/', async (req, res) => {
    
  const getData = async () => {
    const res = getDateImage()
    return res
  }

  async function Webhook(url, data) {
    try {
      console.log('webhook data', url, data)
      const response = await axios.post(url, {
        text: data,
      })
      return response.data
    } catch (error) {
      throw new Error(error.response ? error.response.data : error.message)
    }
  }

  const json = {
    CalendarData: {
      url: 'https://chat.googleapis.com/v1/spaces/AAAAXkDVM58/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=gl1VR4cCoN_8lkctoewxikitEu-Yo31-CwTZPJSEB_c',
      data: async () => {
        return await getData()
      },
    },
  }

  const { CalendarData } = json

  const triggerData = async () => {
    try {
      const result = await Webhook(CalendarData.url, await CalendarData.data())
      console.log('Webhook triggered:', result)
      res.status(200).send('Webhook triggered successfully')
    } catch (error) {
      console.error('Error triggering webhook:', error)
      res.status(500).send('Error triggering webhook')
    }
  }
  triggerData()
})

module.exports = router
