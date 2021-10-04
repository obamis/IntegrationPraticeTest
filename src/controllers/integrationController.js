const { response } = require("express");
const axios = require("axios");
const Balance = require("../models/Balance");
const pipedrive_api_key = process.env.PIPEDRIVE_API_KEY;

const { won_deals } = require("../utils/integrations.utils");

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
};
