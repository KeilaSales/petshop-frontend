import { Container, Card } from 'react-bootstrap';

function Home() {
  return (
    <Container className="mt-4">
      <Card className="text-center border-0 bg-light p-4 shadow-sm">
        <Card.Body>
          <h1 className="display-5 fw-bold text-primary mb-3">🐾 Bem-vindo ao PetShop Gestão</h1>
          <p className="fs-5 text-secondary">
            Sistema completo para gerenciamento de clientes, animais de estimação e agendamento de serviços.
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Home;