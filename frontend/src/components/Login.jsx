import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
//import { login } from '../services/auth';
import { loginSuccess } from '../redux/authSlice';
import { Button, Card, Container, Form } from 'react-bootstrap';
import axiosInstance from "../axiosInstance";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //const tokens = await login(credentials.email, credentials.password);
      const response = await axiosInstance.post('accounts/token/', credentials);

      // set the access and refresh token obteined from django to the localStorage
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);

      const tokens = response.data

      dispatch(loginSuccess(tokens));
      navigate('/tasklist');
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (

    <Container className="mt-5">
      <Card className="p-4" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h2 className="text-center mb-4">Login</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="username" value={credentials.username} onChange={(e) => setCredentials({...credentials, username: e.target.value})} required/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="text" name="password" value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})} required/>
          </Form.Group>

          {error && <div className="error">{error}</div>}
          <br/>

          <Form.Group className="mb-3 text-center">
            <Button variant='success' type='submit'>Ingresar</Button>
            &nbsp;
            <Link className="btn btn-outline-primary" to="/register">Registrarse</Link>
          </Form.Group>
          
        </Form>
      </Card>
    </Container>

    
  );
};

export default Login