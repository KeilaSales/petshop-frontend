import { useContext } from 'react';
import { Modal, Button, Form, FloatingLabel, Container, Row, Col } from 'react-bootstrap';
import PetContext from './PetContext';

function Formulario() {
  const { objeto, handleChange, acaoCadastrar, exibirForm, setExibirForm } = useContext(PetContext);

  return (
    <Modal show={exibirForm} onHide={() => setExibirForm(false)} backdrop="static" keyboard={false}>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>{objeto?.codigo === 0 ? "Cadastrar Novo Pet" : "Editar Pet"}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={acaoCadastrar}>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={12} className="mb-3">
                <FloatingLabel controlId="txtNome" label="Nome do Pet *">
                  <Form.Control
                    type="text"
                    required
                    name="nome"
                    value={objeto?.nome || ''}
                    onChange={handleChange}
                    placeholder="Nome do Pet"
                  />
                </FloatingLabel>
              </Col>
              <Col xs={12} className="mb-3">
                <FloatingLabel controlId="txtEspecie" label="Espécie *">
                  <Form.Select required name="especie" value={objeto?.especie || ''} onChange={handleChange}>
                    <option value="">Selecione...</option>
                    <option value="Cão">Cão</option>
                    <option value="Gato">Gato</option>
                    <option value="Ave">Ave</option>
                    <option value="Outro">Outro</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col xs={12} className="mb-3">
                <FloatingLabel controlId="txtRaca" label="Raça *">
                  <Form.Control
                    type="text"
                    required
                    name="raca"
                    value={objeto?.raca || ''}
                    onChange={handleChange}
                    placeholder="Raça"
                  />
                </FloatingLabel>
              </Col>
              <Col xs={12} className="mb-3">
                <FloatingLabel controlId="txtTutor" label="Tutor Responsável *">
                  <Form.Select required name="tutor" value={objeto?.tutor || ''} onChange={handleChange}>
                    <option value="">Selecione um tutor...</option>
                    {listaTutores?.map((tutor) => (
                      <option key={tutor.codigo} value={tutor.codigo}>
                        {tutor.nome}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setExibirForm(false)}>Cancelar</Button>
          <Button variant="primary" type="submit">Salvar Pet</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default Formulario;