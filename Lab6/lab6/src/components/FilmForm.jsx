import { Form, Button, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import { Film } from "../FilmsModel";
import dayjs from "dayjs";

function FilmForm(props) {
  const [id, setId] = useState(props.film ? props.film.id : props.lastID + 1);
  const [title, setTitle] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [rating, setRating] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Create a new answer
    const film = new Film(id, title, favorite, date, rating);
    //TODO: add validation!
    // if (props.answer) {
    //   props.updateAnswer(answer);
    // } else {
    //   props.addAnswer(answer);
    // }
    props.addFilm(film);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Group as={Row} className="mt-3">
            <Form.Label column>Title</Form.Label>
            <Col mg={10} lg={10}>
              <Form.Control
                type="text"
                required={true}
                minLength={2}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              ></Form.Control>
            </Col>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mt-3">
            <Form.Check
              type="checkbox"
              label="Favorite"
              value={favorite}
              onChange={(event) => {
                setFavorite(event.target.checked);
              }}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mt-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col lg={4}>
          <Form.Group className="mt-3">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              value={rating}
              onChange={(event) => setRating(event.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Form.Group>
          <Button variant="primary" type="submit">
            Add
          </Button>
          <Button variant="danger" onClick={props.cancel}>
            Cancel
          </Button>
        </Form.Group>
      </Row>
    </Form>
  );
}

export default FilmForm;
