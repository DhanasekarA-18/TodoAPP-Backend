const express = require("express");
const router = express.Router();
const axios = require("axios");
const cron = require("node-cron");

const getData = () => {
  const baseUrl = "https://www.tamildailycalendar.com/tamil_daily_calendar.php";
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const action = "Submit=Submit";
  const dynamicUrl = `${baseUrl}?day=${day}&month=${month}&year=${year}&${action}`;
  return dynamicUrl;
};

async function Webhook() {
  const url =
    "https://chat.googleapis.com/v1/spaces/AAAAXkDVM58/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=gl1VR4cCoN_8lkctoewxikitEu-Yo31-CwTZPJSEB_c";
  try {
    const response = await axios.post(url, {
      text: getData(),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
}

const json = {
  CalendarData: {
    url: "https://chat.googleapis.com/v1/spaces/AAAAXkDVM58/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=gl1VR4cCoN_8lkctoewxikitEu-Yo31-CwTZPJSEB_c",
    data: getData(),
  },
};

const { CalendarData } = json;

cron.schedule("13 1 * * *", async () => {
  try {
    const result = await Webhook(CalendarData.url, CalendarData.data);
    console.log("Webhook triggered:", result);
  } catch (error) {
    console.error("Error triggering webhook:", error);
  }
});

module.exports = router;
