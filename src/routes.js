const express = require("express");
const routes = express.Router();
const dealsController = require("./controllers/dealsController");
const ordersController = require("./controllers/ordersController");
const integrationController = require("./controllers/integrationController");

// testes vão sair
routes.get("/resumes", dealsController.index);
routes.post("/save", dealsController.save);

//pipedrive
routes.get("/getDeals", dealsController.getDeals);
routes.get("/getWon", dealsController.getWonDeals);

routes.put("/updateDeal", dealsController.updateDealStatus);
routes.post("/addDeal", dealsController.addDeal);

// Bling
routes.get("/getOrders", ordersController.getOrders);
routes.post("/addOrder", ordersController.addOrder);

routes.get("/integrate", integrationController.Integrate);
routes.get("/save", integrationController.save);
routes.get("/sort", integrationController.sort);
module.exports = routes;
