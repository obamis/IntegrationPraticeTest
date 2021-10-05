const { response } = require("express");

const { getOrders, registerOrder } = require("../utils/bling.utils");

require("dotenv").config();

module.exports = {
  async getOrders(request, response) {
    try {
      let orders = await getOrders();
      return response.status(200).send(orders);
    } catch (error) {
      return response.status(400);
    }
  },

  async registerNewOrder(request, response) {
    try {
      // receive request body in json and send in xml
      let order = request.body;
      let newOrder = await registerOrder(order);

      return response.status(200).send(newOrder);
    } catch (error) {
      return response.status(400);
    }
  },
};
