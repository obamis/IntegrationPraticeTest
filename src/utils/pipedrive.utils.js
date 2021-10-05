require("dotenv").config();

const { response } = require("express");
const axios = require("axios");

const pipedrive_api_key = process.env.PIPEDRIVE_API_KEY;
const domain_company = process.env.DOMAIN_COMPANY_PIPEDRIVE;

const create_deal = async function (title, org_id, value, status) {
  try {
    let info = { title, org_id, value, status };
    let new_deal = axios
      .post(
        `https://${domain_company}.pipedrive.com/v1/deals?api_token=${pipedrive_api_key}`,
        info
      )
      .then((deal) => {
        deal = deal.data.data;

        return deal;
      })
      .catch((err) => console.log(err.message));
    return new_deal;
  } catch (error) {
    console.log({ error: error.message });
  }
};

const getDeals = async function () {
  try {
    let deals = await axios
      .get(
        `https://api.pipedrive.com/api/v1/deals?limit=500&api_token=${pipedrive_api_key}`
      )
      .then((deal) => {
        deals_collection = deal.data.data;

        return deals_collection;
      })
      .catch((error) => response.send(error));
    return deals;
  } catch (error) {
    console.log({ error: error.message });
  }
};

const filterWonDeals = async function () {
  try {
    let filtered_deals = axios
      .get(
        `https://api.pipedrive.com/api/v1/deals?limit=500&api_token=${pipedrive_api_key}`
      )
      .then((deal) => {
        deal = deal.data.data;

        //create an array containing only deals with status === won
        const deal_won_status = deal.filter(
          (element) => element.status === "won"
        );

        let data = deal_won_status;
        return data;
      })
      .catch((err) => response.send(err));
    return filtered_deals;
  } catch (error) {
    console.log({ error: error.message });
  }
};

const updateDeal = async function (title, status, id) {
  try {
    let info = { title, status };

    let att_deal = axios
      .put(
        `https://${domain_company}.pipedrive.com/v1/deals/${id}?api_token=${pipedrive_api_key}`,
        info
      )
      .then((deal) => {
        deal = deal.data;
        return deal;
      })
      .catch((err) => err);
    return att_deal;
  } catch (error) {
    console.log({ error: error.message });
  }
};

module.exports = { filterWonDeals, create_deal, getDeals, updateDeal };
