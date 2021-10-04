const express = require("express");
const routes = express.Router();
const resumeController = require("./controllers/resumeController");

// testes vão sair
routes.get("/resumes", resumeController.index);
routes.post("/save", resumeController.save);

//pipedrive
routes.get("/getDeals", resumeController.getDeals);
routes.get("/getWon", resumeController.getWonDeals);

routes.put("/updateDeal", resumeController.updateDealStatus);
routes.post("/addDeal", resumeController.addDeal);

module.exports = routes;
