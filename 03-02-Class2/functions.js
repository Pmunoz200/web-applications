'use strict';

function Movie(title, genre, duration) {
    this.title = title;
    this.genre = genre;
    this.time = duration;

    this.isLong = () => duration >= 120; 
    //this.isLong = () => this.time > 120; 
}

let inception = new Movie('Inception', 'sci-fi', 180);
let it = new Movie('It', 'horror', 90);

console.log(inception);
console.log(it);

console.log(it.isLong())
