const { response } = require("express");
const axios = require("axios");
const Balance = require("../models/Balance");
const pipedrive_api_key = process.env.PIPEDRIVE_API_KEY;

const {
  won_deals,
  save_orders,
  listaOrders,
  check_before_save,
  listaOrdersValor,
} = require("../utils/integrations.utils");

require("dotenv").config();

module.exports = {
  async Integrate(request, response) {
    try {
      let a = await won_deals();
      return response.status(200).send(a);
    } catch (error) {
      console.log(error);
      return response.status(400).send({ error: " erro na requisição" });
    }
  },

  async save(request, response) {
    try {
      let teste = await save_orders();
      return response.status(200).send(teste);
    } catch (error) {
      return response.status(400).send({ error: " erro na requisição" });
    }
  },

  async sort(request, response) {
    try {
      let ordered_orders = await sort_by_date_value();
      return response.status(200).send(ordered_orders);
    } catch (error) {
      return response.status(400);
    }
  },
};
