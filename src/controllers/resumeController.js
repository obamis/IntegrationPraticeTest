const { response } = require("express");
const axios = require("axios");
const Balance = require("../models/Balance");

module.exports = {
  async index(request, response) {
    try {
      const balances = await Balance.find();
      return response.status(200).json({ balances });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },

  async store(request, response) {
    try {
      const { nome } = request.body;
      console.log(nome);
      return response.status(200).json({ nome });
    } catch (error) {
      return response.json({ error: error.message });
    }
  },

  async save(request, response) {
    try {
      const { order_date, amount } = request.body;

      const resume = new Balance({
        order_date,
        amount,
      });

      await resume.save();

      return response.status(201).json({ message: resume });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async getDeals(request, response) {
    try {
      // let deals = await axios.get(
      //   "https://api.pipedrive.com/api/v1/deals?limit=500&api_token=0b1ed54fe9ff8c31205c6f379811e5008292a45e"
      // );

      axios
        .get(
          "https://api.pipedrive.com/api/v1/deals?limit=500&api_token=0b1ed54fe9ff8c31205c6f379811e5008292a45e"
        )
        .then((data) => {
          // console.log(data.data);
          deal = data.data;
          response.status(200).send({ data: deal });
        })
        .catch((err) => response.send(err));
    } catch (error) {
      return response.json({ error: error.message });
    }
  },
};
