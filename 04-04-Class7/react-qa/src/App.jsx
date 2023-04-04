import 'bootstrap/dist/css/bootstrap.min.css';
import Question from './QAModels';
import { Container, Row, Col, Table  } from "react-bootstrap";
import { Answers } from "./AnswerComponent";

const fakeQuestion = new Question(1, 'Is JS better than python?', 'Luigi De Russis', '2023-02-07');
fakeQuestion.init();

function App() {

  return (
    <Container>
      <Answers answers={fakeQuestion.getAnswers()}></Answers>
    </Container>
  )
}

export default App;
