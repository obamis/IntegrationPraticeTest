const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/getAll", async (req, res) => {
  try {
    // let deals = await axios.get(
    //   "https://api.pipedrive.com/api/v1/deals?limit=500&api_token=0b1ed54fe9ff8c31205c6f379811e5008292a45e"
    // ).data;

    return res.send({ message: "Oi" });
  } catch (error) {
    return res.status(403).send({ error: "Something went wrong" });
  }
});

module.exports = (app) => app.use("/deal", router);
