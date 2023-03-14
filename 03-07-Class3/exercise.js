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

function Question(text, name, date) {
    this.text = text;
    this.name = name;
    this.date = dayjs(date);
    this.answers = [];

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
        return `Question '${this.text}' asked by ${this.name} on ${this.date}. \nIt received ${this.answers.length} answers so far: \n${this.answers}`;
    }
}


const question = new Question('Is JS better than Python?', 'Luigi De Russi', '2023-02-07');
const firstAnswer = new Answer('Yes', 'Luca Mannella', '2023-02-15', -10);
const secondAnswer = new Answer('Not in a million year', 'Guido Van Rossum', '2023-03-02', 5);
const thirdAnswer = new Answer('No', 'Luigi De Russis', '2023-03-02');

question.add(firstAnswer);
question.add(secondAnswer);
question.add(thirdAnswer);


//console.log(question.find("Luca Mannella"));
//console.log(question.listByDate());
//console.log(question.listByScore());

console.log(question.toString());

