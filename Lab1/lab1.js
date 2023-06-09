'use strict';

let movie_id = 1;
const dayjs = require('dayjs');

function Film(title, favorites=false, date=undefined, rating=undefined, id = movie_id){
    this.id = id;
    this.title = title;
    this.favorites = favorites;
    this.date = date==null? undefined: dayjs(date);
    this.rating = rating;
    movie_id += 1;
}

function FilmLibrary (){
    this.films = [];

    this.addNewFilm = (film) =>{
        this.films.push(film);
    }

    this.sortByDate = () =>{

        let filmsDate = [...this.films.filter(x => x.date != null)];
        let filmsNotDate = [... this.films.filter(x => x.date == null)];
        let returnList = [... filmsDate].sort((a, b) => (a.date.isAfter(b.date))? 1 : -1 );
        return returnList.concat(filmsNotDate);
        //return [... this.films.filter(x => x.date != null)].sort((a, b) => (a.date.isAfter(b.date))? 1 : -1);
    }

    this.deleteFilm = (id) =>{
        let newList = [...this.films.filter(x => x.id != id)];
        this.films = [... newList];
    }

    this.resetWatchedFilms = () => {
        this.films.forEach(function(film) {
            film.date = undefined;
        });
    }

    this.sortedScore = () => {
        return [...this.films.filter(x => x.rating != null)].sort((a, b) => b.rating - a.rating);
    }

    this.print = () =>{
        for(let f of this.films){
            f.date != null ? 
            console.log(`Id: ${f.id}, Title: ${f.title}, Favorite: ${f.favorites}, Watch date: ${f.date.format("MMM DD, YYYY")}, Score: ${f.rating}`):
            console.log(`Id: ${f.id}, Title: ${f.title}, Favorite: ${f.favorites}, Watch date: ${f.date}, Score: ${f.rating}`);
        }
    }
}

let movie1 = new Film('Pulp Fiction', true, "03-10-2023", 5);
let movie2 = new Film('21 Grams', true, "03-17-2023", 4);
let movie3 = new Film('Shrek')
const movieLibrary = new FilmLibrary();
movieLibrary.addNewFilm(movie1);
movieLibrary.addNewFilm(movie2);
movieLibrary.addNewFilm(movie3);
movieLibrary.print();
let sortedList = movieLibrary.sortByDate();
//console.log(sortedList);
movieLibrary.deleteFilm(3);
movieLibrary.resetWatchedFilms()
movieLibrary.print();
let sortedScore = movieLibrary.sortedScore();
console.log(sortedScore);



