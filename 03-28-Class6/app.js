'use strict';


function Answer(id, text, author, date, score=0) {
    this.id = id;
    this.text = text;
    this.author = author;
    this.score = score;
    this.date = dayjs(date);

    this.toString = ()=>{
        return `${this.author} replied '${this.text}' on ${this.date.format('YYYY-MM-DD')} and got a score of ${this.score}.\n`
    }
}

function Question(id, text, author, date) {
    this.id = id;
    this.text = text;
    this.author = author;
    this.date = dayjs(date);
    this.answers = [];

    this.add = (answer) => {
        this.answers.push(answer);
    }

    this.find = (author)=>{
        /*const foundAnswer = [];
        for (const a of this.answers){
            if(a.name == name){
                this.foundAnswer.push(a);
            }
        }
        return foundAnswer;*/
        return this.answers.filter(ans => (ans.author === author));
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
        return `Question '${this.text}' asked by ${this.author} on ${this.date}. \nIt received ${this.answers.length} answers so far: \n${this.answers}`;
    }

    this.getAnswers = () => {
        return [... this.answers];
    }

    this.init = () => {
        this.answers.push(
            new Answer(1, 'Yes', 'Luca Mannella', '2023-02-15', -10),
            new Answer(2, 'Not in a million year', 'Guido Van Rossum', '2023-03-02', 5),
            new Answer(3, 'No', 'Luigi De Russis', '2023-03-02'),
            new Answer(4, 'Both have their pros and cons', 'Mario Rossi', '2023-03-04')
        );
    }
}

function createAnswerRow(answer){
    const tr = document.createElement('tr');
    const tdDate = document.createElement('td');
    tdDate.innerText = answer.date.format('YYYY-MM-DD');
    tr.appendChild(tdDate);

    const tdText = document.createElement('td');
    tdText.innerText = answer.text;
    tr.appendChild(tdText);

    const tdAuthor = document.createElement('td');
    tdAuthor.innerText = answer.author;
    tr.appendChild(tdAuthor);

    const tdScore = document.createElement('td');
    tdScore.innerText = answer.score;
    tr.appendChild(tdScore);

    const tdAction = document.createElement('td');
    tdAction.innerHTML = `<button class="btn btn-info" id="answer-vote-${answer.id}">VOTE</button>`;
    tr.appendChild(tdAction);

    return tr;
}


function fillAnswerTable(answers) {
    const answerTable = document.getElementById('answers-table');
    for(const a of answers){
        const ansEl = createAnswerRow(a);
        answerTable.prepend(ansEl);
    }
}


function main(){
    const question = new Question(1, 'Is JS better than Python?', 'Luigi De Russi', '2023-02-07');
    question.init();
    const answers = question.getAnswers();
    fillAnswerTable(answers);
}

main();
