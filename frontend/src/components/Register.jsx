import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import axiosInstance from "../axiosInstance";

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.password2) {
            setError('Las contraseñas no coinciden');
            return;
        }
        
        try {
            await axiosInstance.post('accounts/register/', {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });
            navigate('/tasklist');
        } catch (err) {
            setError(err.response?.data?.message || 'Error al registrar');console.log(err)
        }
    };

    return (
        <Container className="mt-5">
            <Card className="p-4" style={{ maxWidth: '500px', margin: '0 auto' }}>
                <h2 className="text-center mb-4">Registro de Usuario</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre de usuario</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                            required
                        />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                        />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                        />
                    </Form.Group>
                    
                    <Form.Group className="mb-4">
                        <Form.Label>Confirmar Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            value={formData.password2}
                            onChange={(e) => setFormData({...formData, password2: e.target.value})}
                            required
                        />
                    </Form.Group>
                    
                    <Form.Group className="mb-3 text-center">
                        <Button variant="success" type="submit" >
                            Registrarse
                        </Button>
                        &nbsp;
                        <Link className="btn btn-outline-primary" to="/">Login</Link>
                    </Form.Group>
                
                </Form>
            </Card>
        </Container>
    );
};

export default Register;