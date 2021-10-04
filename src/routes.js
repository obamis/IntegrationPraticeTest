const express = require("express");
const routes = express.Router();
const dealsController = require("./controllers/dealsController");

// testes vão sair
routes.get("/resumes", dealsController.index);
routes.post("/save", dealsController.save);

//pipedrive
routes.get("/getDeals", dealsController.getDeals);
routes.get("/getWon", dealsController.getWonDeals);

routes.put("/updateDeal", dealsController.updateDealStatus);
routes.post("/addDeal", dealsController.addDeal);

// Bling

module.exports = routes;
