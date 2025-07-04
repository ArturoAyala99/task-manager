import { useState } from "react"
import { Container, Card, Form, Button, Row, Col, Table} from 'react-bootstrap';
const TaskList = () => {

    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        state: '',
    });

    const handleInputChange = (e) => {
        setNewTask({...newTask, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        
    }
    return(

        <>
            <Container className="container">
                <Row className="row">
                    <Col md={12}>
                    
                        <Card className="text-center p-5 rounded">
                            <Card.Body>
                                <Card.Title as="h1" className="text-light mb-4">
                                    Lista de Tareas
                                </Card.Title>

                            
                                <Form onSubmit={handleSubmit} className="lead text-light">
                                    
                                    <Form.Label>Título</Form.Label>
                                    <br/>
                                    <Form.Control type="text" name="title" value={newTask.title} onChange={handleInputChange} required/>
                                    <br/><br/>
                                
                                    <Form.Label>Descripción</Form.Label>
                                    <br/>
                                    <Form.Control as="textarea" rows={6} name="description" value={newTask.description} onChange={handleInputChange} required/>
                                    <br/><br/>

                                    <Form.Label>Estado</Form.Label>
                                    <br/>
                                    <Form.Control type="text" name="title" value={newTask.state} onChange={handleInputChange} required/>
                                    <br/><br/>

                                    <Button variant="primary" type="submit"> Agregar Tarea </Button>
                                </Form>
                            </Card.Body>
                            
                        </Card>
                    </Col>
                </Row>
                
            </Container>


            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Título</th>
                        <th>Descripción</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <th>
                            <Button variant="Warning">Editar</Button> &nbsp;
                            <Button variant="Danger">Eliminar</Button> 
                        </th>
                    </tr>
                </tbody>
            </Table>
        </>


      
    )
}

export default TaskList