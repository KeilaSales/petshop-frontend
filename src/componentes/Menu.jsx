import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Outlet, Link, useNavigate } from 'react-router-dom';
function Menu() {
  const navigate = useNavigate();
  const logado = localStorage.getItem('usuarioLogado') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    navigate('/login');
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
            🐾 Sistema para PetShop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              {logado && (
                <>
                  <Nav.Link as={Link} to="/tutores">Tutores</Nav.Link>
                  <Nav.Link as={Link} to="/pets">Pets</Nav.Link>
                  <Nav.Link as={Link} to="/agendamentos">Agendamentos</Nav.Link>
                </>
              )}
              <Nav.Link as={Link} to="/sobre">Sobre</Nav.Link>
              {logado ? (
                <Button variant="outline-light" size="sm" className="ms-2" onClick={handleLogout}>
                  Sair
                </Button>
              ) : (
                <Button as={Link} to="/login" className="btn btn-light text-primary btn-sm ms-2 px-3 fw-bold">
                  Login Funcionário
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <Outlet />
      </Container>
    </>
  );
}

export default Menu;