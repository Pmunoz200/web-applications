import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate, useParams } from "react-router-dom";

function FilmsFilter(props) {
  const navigate = useNavigate();
  let { filter } = useParams();
  const active = filter ? filter : props.activeFilter;
  return (
    <ListGroup>
      <ListGroup.Item
        action
        active={active === "All"}
        onClick={() => {
          props.defineFilter("All");
          navigate("/All");
        }}
      >
        All
      </ListGroup.Item>
      <ListGroup.Item
        action
        active={filter === "Favorites"}
        onClick={() => {
          props.defineFilter("Favorites");
          navigate("/Favorites");
        }}
      >
        Favorites
      </ListGroup.Item>
      <ListGroup.Item
        action
        active={filter === "BestRated"}
        onClick={() => {
          props.defineFilter("Best Rated");
          navigate("/BestRated");
        }}
      >
        Best Rated
      </ListGroup.Item>
      <ListGroup.Item
        action
        active={filter === "SeenLastMonth"}
        onClick={() => {
          props.defineFilter("Seen Last Month");
          navigate("/SeenLastMonth");
        }}
      >
        Seen Last Month
      </ListGroup.Item>
      <ListGroup.Item
        action
        active={filter === "Unseen"}
        onClick={() => {
          props.defineFilter("Unseen");
          navigate("/Unseen");
        }}
      >
        Unseen
      </ListGroup.Item>
    </ListGroup>
  );
}

export default FilmsFilter;
