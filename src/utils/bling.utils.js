require("dotenv").config();
const axios = require("axios");
const { response } = require("express");

const bling_api_key = process.env.BLING_API_KEY;
const { xml_request } = require("./integrations.utils");

const get_orders = async function () {
  try {
    let orders = await axios
      .get(`https://bling.com.br/Api/v2/pedidos/json?apikey=${bling_api_key}`)
      .then((order) => {
        // pega o array contendo todos os pedidos
        orders_collection = order.data.retorno;

        // notificação para caso não haja nenhum pedido disponível
        orders_collection.length !== 0
          ? console.log(">0")
          : (orders_collection = "Nenhum pedido disponível");

        return orders_collection;
      })
      .catch((err) => response.send(err));
    return orders;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const add_order = async function (order) {
  try {
    // converte o body da requisição p xml
    let order_xml = await xml_request(order);

    let newOrder = axios
      .post(
        `https://bling.com.br/Api/v2/pedido/json?apikey=${bling_api_key}&xml=${order_xml}`
      )
      .then((order) => {
        new_order = order.data;

        return new_order;
      })
      .catch((err) => console.log(err.message));

    return newOrder;
  } catch (error) {
    return error;
  }
};

module.exports = { get_orders, add_order };
