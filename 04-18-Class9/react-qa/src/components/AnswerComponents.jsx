import "bootstrap-icons/font/bootstrap-icons.css";
import { Row, Col, Table, Button } from "react-bootstrap";
import { useState } from "react";
import FormAnswer from "./FormAnswer";

function Answers(props) {
  return (
    <>
      <Row>
        <Col as="h2">Answers ({props.answers.length}):</Col>
      </Row>
      <Row>
        <Col lg={10} className="mx-auto">
          <AnswerTable
            answers={props.answers}
            voteUp={props.voteUp}
            addAnswer={props.addAnswer}
            updateAnswer={props.updateAnswer}
          ></AnswerTable>
        </Col>
      </Row>
    </>
  );
}

function AnswerTable(props) {
  const [showForm, setshowForm] = useState(false);
  const [sortOrder, setSortOrder] = useState("none");
  const [editableAnswer, setEditableAnswer] = useState();

  const copyAnswer = [...props.answers];

  if (sortOrder === "asc") {
    copyAnswer.sort((a, b) => a.score - b.score);
  } else if (sortOrder === "desc") {
    copyAnswer.sort((a, b) => b.score - a.score);
  }

  const sortByScore = () => {
    setSortOrder((oldOrder) => (oldOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <>
      <Table striped>
        <thead>
          <tr>
            <th>Date</th>
            <th>Text</th>
            <th>Author</th>
            <th>
              Score{" "}
              <Button variant="link" onClick={() => sortByScore()}>
                <i className="bi bi-sort-numeric-down"></i>
              </Button>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {copyAnswer.map((ans) => (
            <AnswerRow
              answer={ans}
              key={ans.id}
              voteUp={props.voteUp}
              setshowForm={setshowForm}
              setEditableAnswer={setEditableAnswer}
            />
          ))}
        </tbody>
      </Table>
      {/* Assuming the last Id is related to the last item on the answers */}

      {showForm ? (
        <FormAnswer
          key={editableAnswer ? editableAnswer.id : -1}
          lastId={props.answers.slice(-1)[0].id}
          answer={editableAnswer}
          addAnswer={(answer) => {
            props.addAnswer(answer);
            setshowForm(false);
          }}
          updateAnswer={(answer) => {
            props.updateAnswer(answer);
            setshowForm(false);
          }}
          cancel={() => {
            setshowForm(false);
            setEditableAnswer();
          }}
        ></FormAnswer>
      ) : (
        <Button variant="success" onClick={() => setshowForm(true)}>
          Add
        </Button>
      )}
    </>
  );
}

function AnswerRow(props) {
  return (
    <tr>
      <AnswerData answer={props.answer} />
      <AnswerActions
        answer={props.answer}
        voteUp={props.voteUp}
        setshowForm={props.setshowForm}
        setEditableAnswer={props.setEditableAnswer}
      />
    </tr>
  );
}

function AnswerData(props) {
  return (
    <>
      <td>{props.answer.date.format("YYYY-MM-DD")}</td>
      <td>{props.answer.text}</td>
      <td>{props.answer.name}</td>
      <td>{props.answer.score}</td>
    </>
  );
}

function AnswerActions(props) {
  return (
    <td>
      <Button
        variant="primary"
        onClick={() => {
          props.setshowForm(true);
          props.setEditableAnswer(props.answer);
        }}
      >
        <i className="bi bi-pencil-square"></i>
      </Button>
      <Button variant="success" onClick={() => props.voteUp(props.answer.id)}>
        <i className="bi bi-arrow-up"></i>
      </Button>
    </td>
  );
}

export default Answers;
