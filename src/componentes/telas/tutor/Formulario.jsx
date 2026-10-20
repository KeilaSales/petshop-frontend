import { useContext, useState} from 'react';
import { Modal, Button, Form, FloatingLabel, Container, Row, Col } from 'react-bootstrap';
import TutorContext from './TutorContext';

function Formulario() {
  const { objeto, handleChange, acaoCadastrar, exibirForm, setExibirForm } = useContext(TutorContext);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity() === true) {
      acaoCadastrar(event);
    }
  };

  return (
    <Modal show={exibirForm} onHide={() => setExibirForm(false)} backdrop="static" keyboard={false}>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>{objeto?.codigo === 0 ? "Cadastrar Novo Tutor" : "Editar Tutor"}</Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={12} className="mb-3">
                <FloatingLabel controlId="txtCodigo" label="Código">
                  <Form.Control type="text" readOnly name="codigo" value={objeto?.codigo || 0} />
                </FloatingLabel>
              </Col>
              <Col xs={12} className="mb-3">
                <FloatingLabel controlId="txtNome" label="Nome do Tutor *">
                  <Form.Control 
                    type="text" 
                    required 
                    name="nome" 
                    value={objeto?.nome || ''} 
                    onChange={handleChange} 
                    placeholder="Nome do Tutor" 
                  />
                  <Form.Control.Feedback>Campo válido!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">Informe o nome do tutor.</Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col xs={12} className="mb-3">
                <FloatingLabel controlId="txtTelefone" label="Telefone *">
                  <Form.Control 
                    type="text" 
                    required 
                    name="telefone" 
                    value={objeto?.telefone || ''} 
                    onChange={handleChange} 
                    placeholder="(00) 00000-0000" 
                  />
                  <Form.Control.Feedback>Campo válido!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">Informe o telefone de contato.</Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col xs={12} className="mb-3">
                <FloatingLabel controlId="txtEmail" label="E-mail *">
                  <Form.Control 
                    type="email" 
                    required 
                    name="email" 
                    value={objeto?.email || ''} 
                    onChange={handleChange} 
                    placeholder="email@exemplo.com" 
                  />
                  <Form.Control.Feedback>Campo válido!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">Informe um e-mail válido.</Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setExibirForm(false)}>Cancelar</Button>
          <Button variant="success" type="submit">Salvar Tutor</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default Formulario;