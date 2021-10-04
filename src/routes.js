const express = require("express");
const routes = express.Router();
const resumeController = require("./controllers/resumeController");

routes.get("/resumes", resumeController.index);
routes.post("/resumes", resumeController.store);

routes.get("/getDeals", resumeController.getDeals);
routes.post("/save", resumeController.save);

module.exports = routes;
