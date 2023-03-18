'use strict';

const sqlite = require('sqlite3');
const dayjs = require('dayjs');

const db = new sqlite.Database('films.db', (err) =>{
    if(err) throw (err);
});

function Film(id, title, favorites=0, date=undefined, rating=undefined){
    this.id = id;
    this.title = title;
    this.favorites = favorites == 1? true:false;
    this.date = date==null? undefined: dayjs(date);
    this.rating = rating == null? undefined: rating;
}

function FilmLibrary (){
    this.films = [];

    this.sortByDate = () =>{

        let filmsDate = [...this.films.filter(x => x.date != null)];
        let filmsNotDate = [... this.films.filter(x => x.date == null)];
        let returnList = [... filmsDate].sort((a, b) => (a.date.isAfter(b.date))? 1 : -1 );
        return returnList.concat(filmsNotDate);
        //return [... this.films.filter(x => x.date != null)].sort((a, b) => (a.date.isAfter(b.date))? 1 : -1);
    }

    this.deleteFilm = (id) =>{
        return new Promise((resolve, reject) => {
        const sql = "DELETE FROM films WHERE id = ?";
        db.run(sql,[id], (err) => {
            if(err){
                console.log("Error while deliting movie");
            }else{
                console.log("Movie successfully deleted!");
            }
        });
        });
    }

    this.resetWatchedFilms = () => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE films SET watchdate=NULL";
            db.run(sql, (err)=> {
                if(err){
                    console.log("Error reseting the watch date");
                }else{
                    console.log("Watch date restarted!");
                }
            });
        });
    }

    this.sortedScore = () => {
        return [...this.films.filter(x => x.rating != null)].sort((a, b) => b.rating - a.rating);
    }

    this.getAllFilms = function getAllFilms(){
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM films";
            const films = [];
            db.all(sql, (err, rows) => {
                if(err) {
                    reject(err);
                }else{
                    rows.forEach((row) => {
                        films.push(new Film(row.id, row.title, row.favorite, row.watchdate, row.rating));    
                    });
                    //console.log(films);
                    resolve(films);
                }
            });
        });
    }

    this.getFavorites = function getFavorites(){
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM films WHERE favorite = 1";
            const films = [];
            db.all(sql, (err, rows) => {
                if(err) {
                    reject(err);
                }else{
                    rows.forEach((row) => {
                        films.push(new Film(row.id, row.title, row.favorite, row.watchdate, row.rating));    
                    });
                    //console.log(films);
                    resolve(films);
                }
            });
        });
    }

    this.watchedToday = function watchedToday(){
        return new Promise((resolve, reject) => {
            const today = dayjs().format("YYYY-MM-DD");
            const sql = "SELECT * FROM films WHERE watchdate = ?";
            const films = [];
            db.all(sql, [today], (err, rows) => {
                if (err){
                    reject(err);
                }else{
                    rows.forEach((row) => {
                        films.push(new Film(row.id, row.title, row.favorite, row.watchdate, row.rating));    
                    });
                    //console.log(films);
                    resolve(films);
                }
            })
        })
    }

    this.watchedBeforeDate = function watchedBeforeDate(date){
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM films WHERE watchdate < ?';
            const films = [];
            db.all(sql, [], (err, rows) =>{
                if(err){
                    reject(err);
                }else{
                    rows.forEach((row) => {
                        films.push(new Film(row.id, row.title, row.favorite, row.watchdate, row.rating));    
                    });
                    //console.log(films);
                    resolve(films);
                }
            });
        });
    }

    this.ratedMovie = function ratedMovie(rating){
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM films WHERE rating >= ?";
            const films = [];
            db.all(sql, [rating], (err, rows) =>  {
                if(err){
                    reject(err);
                }else{
                    rows.forEach((row)=>{
                        films.push(new Film(row.id, row.title, row.favorite, row.watchdate, row.rating));    
                    })
                    resolve(films);
                }
                });
            });
        }
    
        
    this.movieContainsTitle = function movieContainsTitle(str){
        return new Promise((resolve, reject) => {
            str = "%" + str + "%";
            const films = [];
            const sql = "SELECT * FROM films WHERE title like ?"
            db.all(sql, [str], (err, rows) => {
                if(err){
                    reject(err);
                }else{
                    rows.forEach((row)=>{
                        films.push(new Film(row.id, row.title, row.favorite, row.watchdate, row.rating));    
                    })
                    resolve(films);
                }
            });
        });
    }
    
    this.addNewFilm = async function addNewFilm(film){
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO films (title, favorite, watchdate, rating) VALUES(?, ?, ?, ?)"
            db.run(sql,
                [film.title, film.favorites?1:0, film.date==null?'NULL':film.date.toISOString(), film.rating],
                (err) => {
                    if (err){
                        console.log("Error loading the movie");
                    }else{
                        console.log("Movie successfully loaded!");
                    }
                });
        });
    }
    

    this.print = () =>{
        for(let f of this.films){
            f.date != null ? 
            console.log(`Id: ${f.id}, Title: ${f.title}, Favorite: ${f.favorites}, Watch date: ${f.date.format("MMM DD, YYYY")}, Score: ${f.rating}`):
            console.log(`Id: ${f.id}, Title: ${f.title}, Favorite: ${f.favorites}, Watch date: ${f.date}, Score: ${f.rating}`);
        }
    }
}


async function main(){

    const filmL = new FilmLibrary();
    console.log("Film library created!");

    console.log('\n ***********ALL FILMS***********');
    const listFilms = await filmL.getAllFilms();
    listFilms.forEach((elem) => {console.log(`${elem.id}. ${elem.title}`);})

    console.log('\n *******FAVORITE FILMS****************');
    const favoriteFilms = await filmL.getFavorites();
    favoriteFilms.forEach((elem)=> {console.log(`${elem.id}. ${elem.title}`);})

    console.log('\n *******FILMS WATCHED TODAY***********');
    const todayFilms = await filmL.watchedToday();
    todayFilms.forEach((elem)=> {console.log(`${elem.id}. ${elem.title}`);})

    console.log('\n *****FILMS WATCHED BEFORE DATE*******');
    const beforeFilms = await filmL.watchedBeforeDate("2023-03-21");
    todayFilms.forEach((elem)=> {console.log(`${elem.id}. ${elem.title}`);})

    console.log('\n *******FILMS RATING GREATER***********');
    const ratedFilms = await filmL.ratedMovie(3);
    ratedFilms.forEach((elem)=> {console.log(`${elem.id}. ${elem.title}`);});

    console.log('\n *******FILMS CONTAINS STRING***********');
    const pulpMovies = await filmL.movieContainsTitle('Pulp');
    pulpMovies.forEach((elem)=> {console.log(`${elem.id}. ${elem.title}`);});

    let movie2 = new Film(2, 'Dune');
    //filmL.addNewFilm(movie2);
    
    //filmL.deleteFilm(0);
    filmL.resetWatchedFilms();
    db.close();
}

main();


