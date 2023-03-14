'use strict';

const dayjs = require('dayjs');
const sqlite = require('sqlite3');
const questionGenerator = require('./questionGenerator.js');


const db = new sqlite.Database('questions.sqlite', (err) =>{
    if(err) throw (err);
});

db.run("CREATE TABLE IF NOT EXISTS question (id NUMBER, text TEXT, name TEXT, date TEXT, answers TEXT)");

function QuestionList() {
    this.id = 1;
    this.getAllQuestions = function getAllQuestions() {
        return new Promise((resolve, reject) => {
            console.log("Preparing for the query...");
            const sql = "SELECT * FROM question"; // SQL query statement
    
            db.get(sql, [], (err, row) => {
                if(err){
                    reject(err); //If there is an error, perform the reject function
                }else{
                    resolve(err); //If no error, perform the resolve function
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
                resolve(err); //If no error, perform the resolve function
            }
        }); //getting all the questions related to an specific ID

    });
    }

    this.addQuestion = function addQuestion(q) {
        const sql = "INSERT INTO question VALUES (?, ?, ?, ?)"
        db.run(sql, [this.id, q.text, q.name, q.date, q.answers]);
        this.id ++;
    }
}


async function main(){
    const qList = new QuestionList();
    console.log("Question list created!");

    console.log(qList.getAllQuestions());

    const q1 = new questionGenerator.Question('Is JS better than Python?', 'Luigi De Russi', '2023-02-07');
    qList.addQuestion(q1);

    // const q1 = await qList.getQuestion(1)
    // console.log(`The first question is: ${q1}`);
    console.log(qList);
}


main();
debugger;