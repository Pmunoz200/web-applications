'use strict';

const scores = [20, 30, -5, -1, 100, -3, 50];
const betterScores = [];
let NN = 0;

for(const score of scores){
    if(score > 0)
        betterScores.push(score);
}

NN = scores.length - betterScores.length;

/*
let minScore = Math.min(... betterScores);
let index = betterScores.indexOf(minScore);
betterScores.splice(index, 1);

minScore = Math.min(... betterScores);
index = betterScores.indexOf(minScore);
betterScores.splice(index, 1);
*/

//Alternative with sort, to the minimum
betterScores.sort((a,b) => a-b);
betterScores.shift();
betterScores.shift();

let avg = 0;
for(const s of betterScores){
    avg += s;
}

avg /= betterScores.length;

avg = Math.round(avg);

for(let i = 0; i < NN+2; i++){
    betterScores.push(avg);
}

console.log(scores);
console.log(betterScores);

