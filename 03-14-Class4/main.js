'use strict';

const dayjs = require('dayjs');
const sqlite = require('sqlite3');
const questionGenerator = require('./questionGenerator.js');


const db = new sqlite.Database('questions.sqlite', (err) =>{
    if(err) throw (err);
});

db.run("CREATE TABLE IF NOT EXISTS question (id INTEGER NOT NULL, text TEXT NOT NULL, name TEXT NOT NULL, date DATE NOT NULL, PRIMARY KEY(id))");

db.run("CREATE TABLE IF NOT EXISTS answer (id INTEGER NOT NULL, text TEXT NOT NULL, name TEXT NOT NULL, date DATE NOT NULL, score INTEGER DEFAULT 0, questionId INTEGER NOT NULL, FOREIGN KEY (questionId) REFERENCES questions(id), PRIMARY KEY (id))");

function QuestionList() {
    this.answer_id = 1;

    this.getAllQuestions = function getAllQuestions() {
        return new Promise((resolve, reject) => {
            console.log("Preparing for the query...");
            const sql = "SELECT * FROM question"; // SQL query statement
    
            db.get(sql, [], (err, row) => {
                if(err){
                    reject(err); //If there is an error, perform the reject function
                }else{
                    resolve(row); //If no error, perform the resolve function
                }
            }); //getting all the questions related to an specific ID
    
        });
    }
    
    this.getQuestion = function getQuestion(id){
        return new Promise((resolve, reject) => {

        console.log("Preparing for the query...");
        const sql = "SELECT * FROM question WHERE id = ?"; // SQL query statement

        db.get(sql, [id], (err, row) => {
            if(err){
                reject(err); //If there is an error, perform the reject function
            }else{
                resolve(row); //If no error, perform the resolve function
            }
        }); //getting all the questions related to an specific ID

    });
    }

    this.addQuestion = function addQuestion(q) {
        return new Promise((resolve, reject) => {
        const sql = "INSERT INTO question VALUES (?, ?, ?, ?)"
        db.run(sql, [this.question_id, q.text, q.name, q.date, q.answers]);
     });
    }

    this.addAnswer = async function addAnswer(answer, question_id) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO answer VALUES (?, ?, ?, ?, ?, ?)";
            db.run(sql, [answer.id, answer.text, answer.name, answer.date, answer.score, question_id]);
            this.answer_id ++;
        });
    }
        this.getAllAnswers = function getAllAnswers() {
            return new Promise((resolve, reject) => {
                const sql = "SELECT * FROM answer";
                db.run(sql, (err, row) => {
                    if(err) {
                        reject(err);
                    }else{
                        resolve(row);
                    }
                });

            });
        }
        
}


async function main(){
    const qList = new QuestionList();
    console.log("Question list created!");

    console.log(await qList.getAllQuestions());

    const q1 = new questionGenerator.Question(1, 'Is JS better than Python?', 'Luigi De Russi', '2023-02-07');
    qList.addQuestion(q1);
    const q2 = new questionGenerator.Question(2, 'How do you pass WA1?', 'Pablo Munoz', '2023-03-14');
    qList.addQuestion(q2);

    const firstAnswer = new questionGenerator.Answer('Yes', 'Luca Mannella', '2023-02-15', -10);
    const secondAnswer = new questionGenerator.Answer('Not in a million year', 'Guido Van Rossum', '2023-03-02', 5);
    const thirdAnswer = new questionGenerator.Answer('No', 'Luigi De Russis', '2023-03-02');
    qList.addAnswer(firstAnswer, q1.id);
    qList.addAnswer(secondAnswer, q1.id);
    qList.addAnswer(thirdAnswer, q2.id);

    // const q1 = await qList.getQuestion(1)
    // console.log(`The first question is: ${q1}`);
    console.log(await qList.getQuestion(1));
    db.close();
}


main();
debugger;