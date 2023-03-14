'use strict';

const movie = {
    title : 'Inception',
    genre : 'sci-fi',
    duration: 180
}

// We can printe the whole object
console.log(movie);
// We can access the properties of an object via 2 ways
console.log(movie['title']); //Square notation
console.log(movie.title); //With point notaion

// movie['directior'] = 'Nolan' Is equivalent to:
movie.director = 'Nolan';

console.log(movie);

delete movie.genre;
console.log(movie);

for(const prop in movie){
    console.log(`${prop} is ${movie[prop]}`);
}

// We can also get the keys, or the pairs of (key,value) in an array, with the following methods:

let keys = Object.keys(movie);
let keys_values = Object.entries(movie);

//////////To copy the object, we can use the following method //////////

const sameMovie = Object.assign({}, movie);
console.log(sameMovie);

Object.assign(movie, {budget: '1 million'});
console.log(movie);

const improvedMovie = Object.assign({}, movie, {cast: '...'});
console.log(improvedMovie);

const inceptionAgain = {...movie};
console.log(inceptionAgain);
