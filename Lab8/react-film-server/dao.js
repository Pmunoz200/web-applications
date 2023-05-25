"use strict";

const sqlite = require("sqlite3");
const dayjs = require("dayjs");
const { Film } = require("./FilmModel");

// Open the database
const db = new sqlite.Database("films.db", (err) => {
  if (err) throw err;
});

/** FILMS MODELS  **/
exports.getAllFilms = function getAllFilms() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM films";
    const films = [];
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        rows.forEach((row) => {
          films.push(
            new Film(row.id, row.title, row.favorite, row.watchdate, row.rating)
          );
        });
        //console.log(films);
        resolve(films);
      }
    });
  });
};

exports.filmFilters = function filmFilters(filter) {
  return new Promise((resolve, reject) => {
    const films = [];
    const sql = "";
    switch (filter) {
      case "favorite":
        sql = "SELECT * FROM films WHERE favorite = 1";
        break;
      case "BestRated":
        sql = "SELECT * FROM films WHERE rating = 5";
        break;
      case "Unseen":
        sql = "SELECT * FROM films WHERE watchdate IS NULL";
      default:
        sql = "SELECT * FROM films";
        break;
    }
    console.log(sql);
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        rows.forEach((row) => {
          films.push(
            new Film(row.id, row.title, row.favorite, row.watchdate, row.rating)
          );
        });
        //console.log(films);
        resolve(films);
      }
    });
  });
};
