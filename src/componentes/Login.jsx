import { useState } from 'react';
import { Card, Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (usuario === 'admin' && senha === '123456') {
      localStorage.setItem('usuarioLogado', 'true');
      navigate('/tutores');
    } else {
      setErro('Usuário ou senha inválidos! (Use usuario: admin e senha: 123456)');
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: '400px' }} className="shadow-sm p-4">
        <h3 className="fw-bold text-center text-primary mb-3">🔒 Área do Funcionário</h3>
        {erro && <Alert variant="danger">{erro}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Usuário</Form.Label>
            <Form.Control
              type="text"
              value={usuario}
              onChange={e => setUsuario(e.target.value)}
              required
              placeholder="admin"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
              placeholder="123456"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Entrar no Painel
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default Login;