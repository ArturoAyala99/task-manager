import { useEffect, useState } from "react"
import { Container, Card, Form, Button, Row, Col, Table} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchTasks, addTask, updateTask, deleteTask, setEditingId, resetForm, selectFilteredTasks, setFilterStatus } from '../redux/taskSlice';

const TaskList = () => {

    const filteredTasks = useSelector(selectFilteredTasks);
    const { loading, editingId, filterStatus } = useSelector(state => state.tasks);
    const dispatch = useDispatch();

    const [newTask, setNewTask] = useState({
        titulo: '',
        descripcion: '',
        estado: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleInputChange = (e) => { // actualizar los inputs
        setNewTask({...newTask, [e.target.name]: e.target.value});
    };

    const handleEdit = (id) => { // traer los datos de la tarea a editar y ponerlo en los inputs
        const taskToEdit = filteredTasks.find(task => task.id === id);

        setNewTask({
            titulo: taskToEdit.titulo,
            descripcion: taskToEdit.descripcion,
            estado: taskToEdit.estado
        });

        dispatch(setEditingId(id));
    };

    const handleUpdate = async (e) => { //editar una tarea
        e.preventDefault();
        try {
            await dispatch(updateTask(editingId, newTask));

            dispatch(resetForm());

            setNewTask({ titulo: '', descripcion: '', estado: 'PEN' });

            alert('Tarea actualizada!');
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDelete = async (id) => { // eliminar una tarea
        if (window.confirm('¿Estás seguro de eliminar esta tarea?')) {
            try {
                await dispatch(deleteTask(id));
                alert('Tarea eliminada!');
            } catch (error) {
                alert(error.message);
            }
        }
    };

    const handleSubmit = async (e) => { // agregar una nueva tarea
        e.preventDefault();
        try {
            await dispatch(addTask(newTask));

            setNewTask({ titulo: '', descripcion: '', estado: '' });

            alert('Tarea agregada!');
        } catch (error) {
            alert(error.message);
        }
    };

    const cancelEdit = () => { //por si quiero cancelar la edición de la tarea
        dispatch(resetForm());
        setNewTask({ titulo: '', descripcion: '', estado: 'PEN' });
    };

    const handleFilterChange = (e) => { //filtro por estados
        dispatch(setFilterStatus(e.target.value));
    };

    const handleLogout = () => { // quitamos los tokens
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        navigate('/');
    }

    return(
        <>
            <Container className="text-center custom">
                <Card>
                    <Button type="button" className="btn btn-danger" onClick={handleLogout}>Logout</Button>
                    <Card.Body>
                        <h1>Lista de Tareas</h1>
                        <Form onSubmit={editingId ? handleUpdate : handleSubmit}>
                            <Row className="justify-content-center">
                                <Col md={4}>
                                    <Form.Label>Título</Form.Label>
                                    <Form.Control type="text" name="titulo" value={newTask.titulo} onChange={handleInputChange} required/>
                                </Col>

                                <Col md={4}>
                                    <Form.Label>Estado</Form.Label>
                                    <Form.Select name="estado" value={newTask.estado} aria-label="Default select example" onChange={handleInputChange} required>
                                        <option value="">Seleccione estado</option>
                                        <option value="PEN">Pendiente</option>
                                        <option value="PRO">En progreso</option>
                                        <option value="COM">Terminada</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                            <br/>

                            <Row className="justify-content-center">
                                <Col md={8}>
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control as="textarea" rows={6} name="descripcion" value={newTask.descripcion} onChange={handleInputChange} required/>
                                </Col>
                            </Row><br/>

                            <Row className="justify-content-center">
                                <Col md={4}>
                                    <Button variant={editingId ? "success" : "primary"} type="submit" disabled={loading}>
                                        {editingId ? "Guardar Cambios" : "Agregar Tarea"}
                                    </Button>
                                    &nbsp;

                                    {editingId && (
                                        <Button variant="secondary" onClick={cancelEdit}> Cancelar </Button>
                                    )}
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
                <br/>
            </Container>
            <br/>

            {
                filteredTasks  ? (
                    <Container>
                        <Row>
                            <Col md={2}>
                                <Form.Select value={filterStatus} onChange={handleFilterChange} >
                                    <option value="ALL">Todos</option>
                                    <option value="PEN">Pendientes</option>
                                    <option value="PRO">En progreso</option>
                                    <option value="COM">Completadas</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <br/>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Título</th>
                                    <th>Descripción</th>
                                    <th>Opciones</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredTasks .map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.titulo}</td>
                                            <td>{item.descripcion}</td>
                                            <td>{item.estado}</td>
                                            <th>
                                                <Button variant="warning" onClick={() => handleEdit(item.id)}>Editar</Button> &nbsp;
                                                <Button variant="danger" onClick={() => handleDelete(item.id)}>Eliminar</Button> 
                                            </th>
                                        </tr>
                                    ))
                                }
                                
                            </tbody>
                        </Table>
                    </Container>
                ) : (
                    <h3>Agrega una nueva Tarea para empezar!!</h3>
                )
            }
            
        </>
    )
}

export default TaskList