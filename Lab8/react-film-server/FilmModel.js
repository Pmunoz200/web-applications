"use strict";

const dayjs = require("dayjs");

function Film(id, title, favorites = 0, date = undefined, rating = undefined) {
  this.id = id;
  this.title = title;
  this.favorites = favorites == 1 ? true : false;
  this.date = date == null ? undefined : dayjs(date);
  this.rating = rating == null ? undefined : rating;
}

module.exports = { Film };
