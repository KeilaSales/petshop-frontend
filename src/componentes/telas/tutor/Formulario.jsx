import { useContext, useState } from 'react';
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
    <Modal 
      show={exibirForm} 
      onHide={() => { setExibirForm(false); 
                      setValidated(false); }} 
      backdrop="static" 
      keyboard={false}
    >
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
                  <Form.Control.Feedback type="invalid">
                    Informe um nome válido (mínimo 3 caracteres).
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col xs={12} className="mb-3">
                <FloatingLabel controlId="txtTelefone" label="Telefone * (Ex: (54) 99999-0000)">
                  <Form.Control
                    type="text"
                    required
                    pattern="^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$"
                    name="telefone"
                    value={objeto?.telefone || ''}
                    onChange={handleChange}
                    placeholder="(54) 99999-0000"
                  />
                  <Form.Control.Feedback type="invalid">
                    Informe um telefone válido no formato (XX) XXXXX-XXXX.
                  </Form.Control.Feedback>
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
                  <Form.Control.Feedback type="invalid">
                    Informe um e-mail válido.
                  </Form.Control.Feedback>
                  </FloatingLabel>
              </Col>
            </Row>
          </Container>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => { setExibirForm(false); setValidated(false); }}>
            Cancelar
          </Button>
          <Button variant="success" type="submit">
            Salvar Tutor
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default Formulario;