import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col, Table, FormCheck } from "react-bootstrap";
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./media.css";
import dayjs from "dayjs";

function Films(props) {
  const { filter } = useParams();

  return (
    <>
      <Row>
        <Col as="h2"> {filter ? filter : "All"}</Col>
      </Row>
      <Row>
        <Col className="mx-auto">
          <FilmTable
            filmList={props.filmList}
            favoriteMethod={props.favoriteMethod}
            activeFilter={filter}
            addFilm={props.addFilm}
            editFilm={props.editFilm}
          ></FilmTable>
        </Col>
      </Row>
    </>
  );
}

function FilmTable(props) {
  let copyFilm = [];
  const navigate = useNavigate();

  const [editableFilm, setEditableFilm] = useState();

  switch (props.activeFilter) {
    case "Favorites":
      copyFilm = [...props.filmList].filter((f) => f.favorites);
      break;
    case "BestRated":
      copyFilm = [...props.filmList].filter((f) => f.rating === 5);
      break;
    case "SeenLastMonth":
      copyFilm = [...props.filmList].filter((f) =>
        f.date == null ? false : f.date.isAfter(dayjs().subtract(30, "day"))
      );
      break;
    case "Unseen":
      copyFilm = [...props.filmList].filter((f) => f.date == null);
      break;
    default:
      copyFilm = [...props.filmList];
      break;
  }

  const editEditableFilm = (film) => {
    navigate("/:film.id/edit");
  };

  return (
    <>
      <Table>
        <thead></thead>
        <tbody>
          {copyFilm.map((film) => (
            <FilmRow
              film={film}
              title={film.title}
              date={film.date}
              key={film.id}
              favoriteMethod={props.favoriteMethod}
              editFilm={editEditableFilm}
            />
          ))}
        </tbody>
      </Table>
      <Row>
        <div className="d-flex flex-row-reverse bd-highlight">
          <Link
            to="/addFilm"
            onClick={() => setShowForm(true)}
            className="btn btn-primary"
          >
            {" "}
            +{" "}
          </Link>
        </div>
      </Row>
    </>
  );
}

function FilmRow(props) {
  return (
    <tr>
      {props.film.favorites ? (
        <td className="favoriteFilm">{props.film.title}</td>
      ) : (
        <td>{props.film.title}</td>
      )}
      <Favorite
        film={props.film}
        favoriteMethod={props.favoriteMethod}
      ></Favorite>
      <td>
        {props.film.date == null ? "" : props.film.date.format("YYYY-MM-DD")}
      </td>
      <Rating film={props.film}></Rating>
      <FilmEdit editableFilm={props.editFilm} film={props.film}></FilmEdit>
    </tr>
  );
}

function Favorite(props) {
  const [favorite, setFavorite] = useState(props.film.favorites);
  return (
    <>
      <td>
        <Form.Check
          type={"checkbox"}
          label={"Favorite"}
          checked={favorite}
          onChange={(e) => {
            props.favoriteMethod(props.film.id, e.currentTarget.checked);
            setFavorite(e.currentTarget.checked);
          }}
        />
      </td>
    </>
  );
}

function Rating(props) {
  const rating = props.film.rating;
  const fillStar = [];
  const emptyStar = [];
  for (let i = 0; i < rating; i++) {
    fillStar.push(<i className="bi bi-star-fill" key={i}></i>);
  }

  for (let i = 0; i < 5 - rating; i++) {
    fillStar.push(<i className="bi bi-star" key={i + rating}></i>);
  }

  return (
    <td>
      {fillStar}
      {emptyStar}
    </td>
  );
}

function FilmEdit(props) {
  return (
    <td>
      <Button
        variant="outline-dark"
        onClick={() => props.editableFilm(props.film)}
      >
        <i className="bi bi-pencil-fill"></i>
      </Button>
    </td>
  );
}

export default Films;
