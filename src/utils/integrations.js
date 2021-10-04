const { response } = require("express");
const axios = require("axios");
const Balance = require("../models/Balance");
pipedrive_api_key = process.env.PIPEDRIVE_API_KEY;

require("dotenv").config();

const filter_won_Deals = async function () {
  try {
    let filtered_deals = axios
      .get(
        `https://api.pipedrive.com/api/v1/deals?limit=500&api_token=${pipedrive_api_key}`
      )
      .then((deal) => {
        deal = deal.data.data;

        //cria um array contendo apenas as deals com status === won
        const deal_won_status = deal.filter(
          (element) => element.status === "won"
        );

        let data = deal_won_status;
        return data;

        // console.log(deal_won_status.length);
      })
      .catch((err) => response.send(err));
    return filtered_deals;
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

module.exports = filter_won_Deals;
