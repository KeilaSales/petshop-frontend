import { Card, Container, Row, Col } from 'react-bootstrap';


function Sobre() {
  return (
    <Container className="mt-3">
      <Card className="shadow-sm border-0 p-4 bg-light">
        <Card.Body>
          <h2 className="fw-bold text-primary mb-3">Gerenciador de Pet Shop</h2>
          <p className="fs-5 text-secondary">
            Desenvolvido para simplificar o controle operacional do estabelecimento, o sistema permite ao proprietário e colaboradores gerenciar de forma rápida e intuitiva todo o fluxo de clientes, animais cadastrados e agendamentos de serviços. Tambem serve para os clientes poderem agendar serviços de banho, tosa e consultas veterinárias de forma prática e eficiente, garantindo uma experiência satisfatória para todos os envolvidos.
          </p>
          <hr />
          <h4 className="fw-bold mt-4">Funcionalidades do Painel</h4>
          <Row className="mt-3">
            <Col md={4}>
              <div className="p-3 bg-white rounded shadow-sm border mb-3">
                <h5>👥 Gestão de Tutores</h5>
                <p className="text-muted small">Cadastro completo de clientes com contato e histórico de pets associados.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-3 bg-white rounded shadow-sm border mb-3">
                <h5>🐶 Controle de Pets</h5>
                <p className="text-muted small">Registro de animais informando espécie, raça e vinculo direto com o tutor responsável.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-3 bg-white rounded shadow-sm border mb-3">
                <h5>📅 Agendamento de Serviços</h5>
                <p className="text-muted small">Marcação de banho, tosa e consultas com especificação de datas e valores.</p>
              </div>
            </Col>
          </Row>

          <div className="mt-4 pt-3 border-top">
            <h5 className="fw-bold">Informações Acadêmicas</h5>
            <ul className="list-unstyled text-secondary">
              <li><strong>Instituição:</strong> IFSUL — Campus Passo Fundo</li>
              <li><strong>Disciplina:</strong> Programação Web</li>
              <li><strong>Professora:</strong> Jéssica Di Domênico</li>
            </ul>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Sobre;