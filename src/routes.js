const express = require("express");
const routes = express.Router();
const dealsController = require("./controllers/dealsController");
const ordersController = require("./controllers/ordersController");
const integrationController = require("./controllers/integrationController");

// testes vão sair
routes.get("/resumes", dealsController.index);
routes.post("/save", dealsController.save);

//About pipedrive
routes.get("/deals", dealsController.getDeals);
routes.get("/wonDeals", dealsController.getWonDeals);

routes.put("/updateDeal", dealsController.updateDealStatus);
routes.post("/addDeal", dealsController.addDeal);

// About Bling
routes.get("/getOrders", ordersController.getOrders);
routes.post("/addOrder", ordersController.registerNewOrder);

// Integration endpoints
routes.get("/integrate", integrationController.registerDealAsOrder);
routes.get("/save", integrationController.saveOrders);
routes.get("/sort", integrationController.sort);
module.exports = routes;
