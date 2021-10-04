const { response } = require("express");
const axios = require("axios");
const Balance = require("../models/Balance");
const pipedrive_api_key = process.env.PIPEDRIVE_API_KEY;

const {
  create_deal,
  get_all_Deals,
  filter_won_Deals,
  update_deal,
} = require("../utils/pipedrive.utils");

require("dotenv").config();

module.exports = {
  async index(request, response) {
    try {
      const balances = await Balance.find();
      return response.status(200).json({ balances });
    } catch (error) {
      response.status(500).json({ error: error.message });
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

  // pipedrive

  // get all deals
  async getDeals(request, response) {
    try {
      let deals = await get_all_Deals();
      console.log("Existem " + deals.length + " deals abertas");
      response.status(200).send(deals);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  },

  // search for deals with status === won
  async getWonDeals(request, response) {
    try {
      let deals = await filter_won_Deals();

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

      let newDeal = await create_deal(title, org_id, value, status);
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

      const deal = await update_deal(title, status, id);
      response.status(200).send(deal);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  },
};
