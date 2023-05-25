///// Server implementations or the API
"use strict";
//Imports
const express = require("express");
const morgan = require("morgan");
const dao = require("./dao");

//init
const app = express();
const port = 3001;

//set up middlewares
app.use(express.json());
app.use(morgan("dev"));

// ROUTES
//GET /api/films
app.get("/api/films", async (req, res) => {
  try {
    const films = await dao.getAllFilms();
    res.json(films);
  } catch {
    res.status(500).end();
  }
});

//GET /api/films/<filter>
app.get("/api/films/:filter", async (req, res) => {
  try {
    const films = await dao.filmFilters(req.params.filter);
    res.json(films);
  } catch {
    res.status(500).end();
  }
});

app.listen(port, () => "API server started");
