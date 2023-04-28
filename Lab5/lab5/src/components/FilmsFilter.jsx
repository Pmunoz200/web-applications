import ListGroup from "react-bootstrap/ListGroup";

function FilmsFilter(props) {
  return (
    <ListGroup>
      <ListGroup.Item
        action
        active={props.activeFilter === "All"}
        onClick={() => props.defineFilter("All")}
      >
        All
      </ListGroup.Item>
      <ListGroup.Item
        action
        active={props.activeFilter === "Favorites"}
        onClick={() => props.defineFilter("Favorites")}
      >
        Favorites
      </ListGroup.Item>
      <ListGroup.Item
        action
        active={props.activeFilter === "Best Rated"}
        onClick={() => props.defineFilter("Best Rated")}
      >
        Best Rated
      </ListGroup.Item>
      <ListGroup.Item
        action
        active={props.activeFilter === "Seen Last Month"}
        onClick={() => props.defineFilter("Seen Last Month")}
      >
        Seen Last Month
      </ListGroup.Item>
      <ListGroup.Item
        action
        active={props.activeFilter === "Unseen"}
        onClick={() => props.defineFilter("Unseen")}
      >
        Unseen
      </ListGroup.Item>
    </ListGroup>
  );
}

export default FilmsFilter;
