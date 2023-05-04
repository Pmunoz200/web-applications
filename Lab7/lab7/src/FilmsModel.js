"use strict";
import dayjs from "dayjs";

let movie_id = 1;

function Film(id, title, favorites = false, date = "", rating = 0) {
  this.id = id;
  this.title = title;
  this.favorites = favorites;
  this.date = date == "" ? undefined : dayjs(date);
  this.rating = rating;
}

function FilmLibrary() {
  this.films = [];

  this.addNewFilm = (film) => {
    this.films.push(film);
  };

  this.sortByDate = () => {
    let filmsDate = [...this.films.filter((x) => x.date != null)];
    let filmsNotDate = [...this.films.filter((x) => x.date == null)];
    let returnList = [...filmsDate].sort((a, b) =>
      a.date.isAfter(b.date) ? 1 : -1
    );
    return returnList.concat(filmsNotDate);
    //return [... this.films.filter(x => x.date != null)].sort((a, b) => (a.date.isAfter(b.date))? 1 : -1);
  };

  this.deleteFilm = (id) => {
    let newList = [...this.films.filter((x) => x.id != id)];
    this.films = [...newList];
  };

  this.resetWatchedFilms = () => {
    this.films.forEach(function (film) {
      film.date = undefined;
    });
  };

  this.sortedScore = () => {
    return [...this.films.filter((x) => x.rating != null)].sort(
      (a, b) => b.rating - a.rating
    );
  };

  this.print = () => {
    for (let f of this.films) {
      f.date != null
        ? console.log(
            `Id: ${f.id}, Title: ${f.title}, Favorite: ${
              f.favorites
            }, Watch date: ${f.date.format("MMM DD, YYYY")}, Score: ${f.rating}`
          )
        : console.log(
            `Id: ${f.id}, Title: ${f.title}, Favorite: ${f.favorites}, Watch date: ${f.date}, Score: ${f.rating}`
          );
    }
  };

  this.setAllFilms = (films) => {
    this.films = [...films];
  };

  this.init = () => {
    this.films.push(
      new Film(0, "Pulp Fiction", true, "03/10/2023", 5),
      new Film(1, "21 Grams", true, "03/17/2023", 4),
      new Film(2, "Shrek"),
      new Film(3, "Star Wars"),
      new Film(4, "Madagascar", false, "02/25/2023", 3),
      new Film(5, "Matrix"),
      new Film(6, "AoT", true, "04/20/2023", 5)
    );
  };
}

export { Film, FilmLibrary };
