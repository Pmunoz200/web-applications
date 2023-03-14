'use strict';
const dayjs = require('dayjs');

function Answer(text, name, date, score=0) {

    this.text = text;
    this.name = name;
    this.score = score;
    this.date = dayjs(date);

    this.toString = ()=>{
        return `${this.name} replied '${this.text}' on ${this.date.format('YYYY-MM-DD')} and got a score of ${this.score}.\n`
    }
}

function Question(id, text, name, date) {
    this.id = id;
    this.text = text;
    this.name = name;
    this.date = dayjs(date);

    this.add = (answer) => {
        this.answers.push(answer);
    }

    this.find = (name)=>{
        /*const foundAnswer = [];
        for (const a of this.answers){
            if(a.name == name){
                this.foundAnswer.push(a);
            }
        }
        return foundAnswer;*/
        return this.answers.filter(ans => (ans.name === name));
    }

    this.afterDate = (date)=> {
        return this.answers.filter(ans => ans.date.isAfter(date));
    }

    this.listByDate = () => {
        return [... this.answers].sort((a, b) => (a.date.isAfter(b.date))? 1 : -1 );
    }

    this.listByScore = ()=> {
        return [...this.answers].sort((a,b) => (b.score-a.score));
    }

    this.toString = () =>{
        return `Question '${this.text}' asked by ${this.name} on ${this.date}.`;
    }
}

module.exports = {
    Question,
    Answer
};


