const { response } = require("express");
const axios = require("axios");
const Balance = require("../models/Balance");
const pipedrive_api_key = process.env.PIPEDRIVE_API_KEY;

const {
  createDeal,
  getDeals,
  filterWonDeals,
  updateDeal,
} = require("../utils/pipedrive.utils");

require("dotenv").config();

module.exports = {
  async getDeals(request, response) {
    try {
      let deals = await getDeals();
      console.log("There are  " + deals.length + "  deals available");
      response.status(200).send(deals);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  },

  // search for deals with status === won
  async getWonDeals(request, response) {
    try {
      let deals = await filterWonDeals();

      console.log("Existem " + deals.length + " deals disponíveis");
      response.status(200).send(deals);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  },

  // addDeal
  async addDeal(request, response) {
    try {
      const { title, org_id, value, status } = request.body;

      if (!title | !org_id)
        response.status(400).json({ error: "Campo obrigatório faltando" });

      let newDeal = await createDeal(title, org_id, value, status);
      response.status(200).send(newDeal);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  },

  async updateDealStatus(request, response) {
    try {
      const { title, status, id } = request.body;

      // Field validations
      if (!title | !id)
        return response
          .status(400)
          .send({ error: "O campos 'title' e 'id' são obrigatórios" });

      if (status !== "won" && status !== "lost")
        return response
          .status(400)
          .send({ error: "valor não aceito para o campo status" });

      const deal = await updateDeal(title, status, id);
      response.status(200).send(deal);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  },
};
