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

exports.favoriteFilms = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM films WHERE favorite = 1";
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

exports.unseenFilms = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM films WHERE watchdate IS NULL";
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
