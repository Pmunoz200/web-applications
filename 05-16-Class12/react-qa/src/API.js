/* Add the API calls here */
"use strict";

import { Question, Answer } from "./QAModels";
const SERVER_URL = "http://localhost:3001";

const getQuestions = async () => {
  const response = await fetch(SERVER_URL + "/api/questions");

  if (response.ok) {
    const questionJson = await response.json();
    return questionJson.map(
      (q) => new Question(q.id, q.text, q.author, q.date)
    );
  } else {
    throw new Error("Internal Server Error");
  }
};

const getAnswers = async (questionId) => {
  const response = await fetch(
    SERVER_URL + `/api/questions/${questionId}/answers`
  );

  if (response.ok) {
    const answersJson = await response.json();
    return answersJson.map(
      (ans) => new Answer(ans.id, ans.text, ans.author, ans.score, ans.date)
    );
  } else {
    throw new Error("Internal Server Error");
  }
};

const API = { getQuestions, getAnswers };
export default API;
