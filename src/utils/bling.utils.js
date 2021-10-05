require("dotenv").config();
const axios = require("axios");
const { response } = require("express");

const bling_api_key = process.env.BLING_API_KEY;
const { xml_request } = require("./integrations.utils");

const getOrders = async function () {
  try {
    let orders = await axios
      .get(`https://bling.com.br/Api/v2/pedidos/json?apikey=${bling_api_key}`)
      .then((order) => {
        let orders_collection = order.data;

        try {
          if (orders_collection) return orders_collection.retorno.pedidos;

          return "No order available";
        } catch (error) {
          return error;
        }
      })
      .catch((error) => response.send(error));
    return orders;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const registerOrder = async function (order) {
  try {
    // converts json request body to xml
    let order_xml = await xml_request(order);

    let newOrder = axios
      .post(
        `https://bling.com.br/Api/v2/pedido/json?apikey=${bling_api_key}&xml=${order_xml}`
      )
      .then((order) => {
        new_order = order.data;

        return new_order;
      })
      .catch((error) => console.log(error.message));

    return newOrder;
  } catch (error) {
    return error;
  }
};

module.exports = { getOrders, registerOrder };
