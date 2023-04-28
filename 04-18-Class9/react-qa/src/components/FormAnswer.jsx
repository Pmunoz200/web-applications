import { Form, Button } from "react-bootstrap";
import React, { useState } from "react";
import { Answer } from "../QAModels";
import dayjs from "dayjs";

function FormAnswer(props) {
  const [id, setId] = useState(
    props.answer ? props.answer.text : props.lastId + 1
  );
  const [text, setText] = useState(props.answer ? props.answer.text : "");
  const [name, setName] = useState(props.answer ? props.answer.name : "");
  const [date, setDate] = useState(
    props.answer
      ? props.answer.date.format("YYYY-MM-DD")
      : dayjs().format("YYYY-MM-DD")
  );
  const [score, setScore] = useState(props.answer ? props.answer.score : 0);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Create a new answer
    const answer = new Answer(id, text, name, date, score);
    //TODO: add validation!
    if (props.answer) {
      props.updateAnswer(answer);
    } else {
      props.addAnswer(answer);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mt-3">
        <Form.Label>Text</Form.Label>
        <Form.Control
          type="text"
          required={true}
          minLength={6}
          value={text}
          onChange={(event) => setText(event.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          required={true}
          value={name}
          onChange={(event) => setName(event.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Button variant="primary" type="submit">
          Add
        </Button>
        <Button variant="danger" onClick={props.cancel}>
          Cancel
        </Button>
      </Form.Group>
    </Form>
  );
}

export default FormAnswer;
