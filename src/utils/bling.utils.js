require("dotenv").config();
const axios = require("axios");
const { response } = require("express");

const bling_api_key = process.env.BLING_API_KEY;

const get_orders = async function () {
  try {
    let orders = (
      await axios.get(
        `https://bling.com.br/Api/v2/pedidos/json?apikey=${bling_api_key}`
      )
    ).data;

    return orders;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = { get_orders };
