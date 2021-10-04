const { response } = require("express");
const axios = require("axios");
const Balance = require("../models/Balance");
const pipedrive_api_key = process.env.PIPEDRIVE_API_KEY;

const { get_orders, add_order } = require("../utils/bling.utils");

require("dotenv").config();

module.exports = {
  async getOrders(request, response) {
    try {
      let orders = await get_orders();
      return response.status(200).send(orders);
    } catch (error) {
      return response.status(400).send({ error: " erro na requisição" });
    }
  },

  async addOrder(request, response) {
    try {
      // receber corpo da requisição em json e enviar em xml
      let order = request.body;
      let newOrder = await add_order(order);

      return response.status(200).send(newOrder);
    } catch (error) {
      return response.status(400).send({ error: " erro na requisição" });
    }
  },
};
