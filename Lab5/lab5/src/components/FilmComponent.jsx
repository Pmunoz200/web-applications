import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col, Table, FormCheck } from "react-bootstrap";
import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./media.css";

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
          ></FilmTable>
        </Col>
      </Row>
    </>
  );
}

function FilmTable(props) {
  const copyFilm = [...props.filmList];

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
      <Rating></Rating>
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
  return <></>;
}

export default Films;
