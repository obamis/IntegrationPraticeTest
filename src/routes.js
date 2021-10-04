const express = require("express");
const routes = express.Router();
const resumeController = require("./controllers/resumeController");

routes.get("/resumes", resumeController.index);
routes.post("/resumes", resumeController.store);

routes.post("/addDeal", resumeController.addDeal);
routes.get("/getDeals", resumeController.getDeals);
routes.get("/getWon", resumeController.getWonDeals);
routes.put("/updateDeal", resumeController.updateDealStatus);

routes.post("/save", resumeController.save);

module.exports = routes;
