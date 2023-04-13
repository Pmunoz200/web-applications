import { Form, Button } from 'react-bootstrap';
import React, {useState} from 'react' ;

function FormAnswer() {
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = () => {
        // do Something
    }

    return(
        <Form>
            <Form.Group className='mt-3'>
                <Form.Label>Text</Form.Label>
                <Form.Control type = 'text' required = {true} minLength={6} value={text} onChange={(event) => setText(event.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className='mt-3'>
                <Form.Label>Author</Form.Label>
                <Form.Control type = 'text' required = {true} value={name} onChange={(event) => setName(event.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className='mt-3'>
                <Form.Label>Date</Form.Label>
                <Form.Control type = 'date' value={date} onChange={(event) => setDate(event.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Button variant='primary' type='submit'>Add</Button>
                <Button variant='danger'>Cancel</Button>
            </Form.Group>
        </Form>
    );
}

export default FormAnswer;