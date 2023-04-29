import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import NavigationBar from "./components/NavBar";
import { Container, Row, Col, Button } from "react-bootstrap";
import FilmsFilter from "./components/FilmsFilter";
import Films from "./components/FilmComponent";
import { Film, FilmLibrary } from "./FilmsModel.js";
import "./index.css";

const filmLib = new FilmLibrary();
filmLib.init();

function App() {
  const [filmList, setFilmList] = useState(filmLib.films);
  const [filter, setFilter] = useState("All");

  const favorite = (filmID, status) => {
    setFilmList((films) => {
      return films.map((film) => {
        if (film.id === filmID) {
          return new Film(film.id, film.title, status, film.date, film.rating);
        } else {
          return film;
        }
      });
    });
    return status;
  };

  const addFilm = (film) => {
    setFilmList((oldFilm) => [...oldFilm, film]);
  };

  const editFilm = (film) => {
    setFilmList((films) => {
      return films.map((f) => {
        if (f.id === film.id) {
          return new Film(
            film.id,
            film.title,
            film.favorites,
            film.date,
            film.rating
          );
        } else {
          return f;
        }
      });
    });
    console.log(filmList);
  };

  const defineFilter = (f) => {
    setFilter(f);
  };

  return (
    <>
      <NavigationBar />
      <Container className="mt-3" fluid>
        <Row>
          <Col sm={4}>
            <FilmsFilter
              defineFilter={defineFilter}
              activeFilter={filter}
            ></FilmsFilter>
          </Col>
          <Col>
            <Films
              filmList={filmList}
              favoriteMethod={favorite}
              activeFilter={filter}
              addFilm={addFilm}
              editFilm={editFilm}
            ></Films>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
