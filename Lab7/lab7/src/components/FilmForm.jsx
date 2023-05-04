import { Form, Button, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import { Film } from "../FilmsModel";
import dayjs from "dayjs";
import { useNavigate, Link } from "react-router-dom";

function FilmForm(props) {
  const [id, setId] = useState(props.film ? props.film.id : props.lastID + 1);
  const [title, setTitle] = useState(props.film ? props.film.title : "");
  const [favorite, setFavorite] = useState(
    props.film ? props.film.favorites : false
  );
  const [date, setDate] = useState(() => {
    if (props.film) {
      return props.film.date == null
        ? undefined
        : props.film.date.format("YYYY-MM-DD");
    } else {
      return dayjs().format("YYYY-MM-DD");
    }
  });
  const [rating, setRating] = useState(props.film ? props.film.rating : 0);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Create a new answer
    const film = new Film(id, title, favorite, date, rating);
    //TODO: add validation!
    if (props.film) {
      props.editFilm(film);
    } else {
      props.addFilm(film);
      navigate("..");
    }
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
              checked={favorite}
              onChange={(event) => {
                setFavorite(event.currentTarget.checked);
                console.log(favorite);
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
          {props.film ? (
            <Button variant="success" type="submit">
              Edit
            </Button>
          ) : (
            <Button variant="primary" type="submit">
              Add
            </Button>
          )}
          <Link to=".." className="btn btn-danger" onClick={props.cancel}>
            Cancel
          </Link>
        </Form.Group>
      </Row>
    </Form>
  );
}

export default FilmForm;
