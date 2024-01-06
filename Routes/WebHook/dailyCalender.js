const express = require('express')
const router = express.Router()
const axios = require('axios')
const cron = require('node-cron')
const { getDateImage } = require('../../utils/dateFunctions')

const getData = async () => {
  const res = await getDateImage()
  return res;
}

async function Webhook(url, data) {
  try {
    console.log('Webhook Payload', url, data)
    const response = await axios.post(url, {
      text: data,
    })
    return response.data
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message)
  }
}

const json = {
  calendarData: {
    url: 'https://chat.googleapis.com/v1/spaces/AAAAXkDVM58/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=gl1VR4cCoN_8lkctoewxikitEu-Yo31-CwTZPJSEB_c',
    data: async () => {
      return await getData()
    },
  },
}

const { calendarData } = json

cron.schedule('21 9 * * *', async () => {
  try {
    const result = await Webhook(calendarData?.url, await calendarData?.data())
    console.log('Webhook triggered:', result)
  } catch (error) {
    console.error('Error triggering webhook:', error)
  }
})

module.exports = router
