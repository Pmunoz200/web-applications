import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col, Table, FormCheck } from "react-bootstrap";
import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./media.css";
import dayjs from "dayjs";

function Films(props) {
  return (
    <>
      <Row>
        <Col as="h2"> {props.activeFilter}</Col>
      </Row>
      <Row>
        <Col className="mx-auto">
          <FilmTable
            filmList={props.filmList}
            favoriteMethod={props.favoriteMethod}
            activeFilter={props.activeFilter}
          ></FilmTable>
        </Col>
      </Row>
    </>
  );
}

function FilmTable(props) {
  let copyFilm = [];
  switch (props.activeFilter) {
    case "Favorites":
      copyFilm = [...props.filmList].filter((f) => f.favorites);
      break;
    case "Best Rated":
      copyFilm = [...props.filmList].filter((f) => f.rating === 5);
      break;
    case "Seen Last Month":
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
            />
          ))}
        </tbody>
      </Table>
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
    </tr>
  );
}

function Favorite(props) {
  const [checked, setChecked] = useState(props.film.favorites);
  return (
    <>
      <td>
        <Form.Check
          type={"checkbox"}
          label={"Favorite"}
          checked={checked}
          onChange={(e) => {
            setChecked(e.currentTarget.checked);
            props.favoriteMethod(props.film.id, e.currentTarget.checked);
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

export default Films;
