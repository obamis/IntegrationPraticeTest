const { response } = require("express");

const { won_deals, save_orders } = require("../utils/integrations.utils");

require("dotenv").config();

module.exports = {
  async registerDealAsOrder(request, response) {
    try {
      let deals = await won_deals();
      return response.status(200).send(deals);
    } catch (error) {
      console.log(error);
      return response.status(400);
    }
  },

  async saveOrders(request, response) {
    try {
      let saved_orders = await save_orders();
      return response.status(200).send(saved_orders);
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
