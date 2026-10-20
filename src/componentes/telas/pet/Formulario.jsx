import { useContext } from 'react';
import { Modal, Button, Form, FloatingLabel, Container, Row, Col } from 'react-bootstrap';
import TutorContext from './TutorContext';

function Formulario() {
  const { objeto, handleChange, acaoCadastrar, exibirForm, setExibirForm } = useContext(TutorContext);

  return (
    <Modal show={exibirForm} onHide={() => setExibirForm(false)} backdrop="static" keyboard={false}>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>{objeto?.codigo === 0 ? "Cadastrar Novo Tutor" : "Editar Tutor"}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={acaoCadastrar}>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={12} className="mb-3">
                <FloatingLabel controlId="txtCodigo" label="Código">
                  <Form.Control type="text" readOnly name="codigo" value={objeto?.codigo || ''} />
                </FloatingLabel>
              </Col>
              <Col xs={12} className="mb-3">
                <FloatingLabel controlId="txtNome" label="Nome do Tutor *">
                  <Form.Control type="text" required name="nome" value={objeto?.nome || ''} onChange={handleChange} placeholder="Nome do Tutor" />
                </FloatingLabel>
              </Col>
              <Col xs={12} className="mb-3">
                <FloatingLabel controlId="txtTelefone" label="Telefone *">
                  <Form.Control type="text" required name="telefone" value={objeto?.telefone || ''} onChange={handleChange} placeholder="(00) 00000-0000" />
                </FloatingLabel>
              </Col>
              <Col xs={12} className="mb-3">
                <FloatingLabel controlId="txtEmail" label="E-mail *">
                  <Form.Control type="email" required name="email" value={objeto?.email || ''} onChange={handleChange} placeholder="email@exemplo.com" />
                </FloatingLabel>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setExibirForm(false)}>Cancelar</Button>
          <Button variant="primary" type="submit">Salvar Tutor</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default Formulario;