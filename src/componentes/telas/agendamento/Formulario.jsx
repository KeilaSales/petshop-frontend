import { useContext } from 'react';
import { Modal, Button, Form, FloatingLabel, Container, Row, Col } from 'react-bootstrap';
import AgendamentoContext from './AgendamentoContext';

function Formulario() {
  const { objeto, handleChange, acaoCadastrar, exibirForm, setExibirForm, listaPets } = useContext(AgendamentoContext);

  return (
    <Modal show={exibirForm} onHide={() => setExibirForm(false)} backdrop="static" keyboard={false}>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>{objeto?.codigo === 0 ? "Novo Agendamento" : "Editar Agendamento"}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={acaoCadastrar}>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={12} className="mb-3">
                <FloatingLabel controlId="txtServico" label="Tipo de Serviço *">
                  <Form.Select required name="servico" value={objeto?.servico || ''} onChange={handleChange}>
                    <option value="">Selecione o serviço...</option>
                    <option value="Somente Banho">Somente Banho</option>
                    <option value="Tosa Higiênica">Tosa Higiênica</option>
                    <option value="Somente Tosa">Somente Tosa</option>
                    <option value="Banho e Tosa Completa">Banho e Tosa Completa</option>
                    <option value="Hidratação de Pelagem">Hidratação de Pelagem</option>
                    <option value="Consulta Veterinária">Consulta Veterinária</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>

              <Col xs={12} className="mb-3">
                <FloatingLabel controlId="txtData" label="Data do Agendamento *">
                  <Form.Control type="date" required name="data_agendamento" value={objeto?.data_agendamento || ''} onChange={handleChange} />
                </FloatingLabel>
              </Col>

              <Col xs={12} className="mb-3">
                <FloatingLabel controlId="txtValor" label="Valor (R$) *">
                  <Form.Control type="number" step="0.01" required name="valor" value={objeto?.valor || ''} onChange={handleChange} placeholder="0.00" />
                </FloatingLabel>
              </Col>

              <Col xs={12} className="mb-3">
                <FloatingLabel controlId="txtPet" label="Pet Agendado *">
                  <Form.Select required name="pet" value={objeto?.pet || ''} onChange={handleChange}>
                    <option value="">Selecione um pet...</option>
                    {listaPets?.map((pet) => (
                      <option key={pet.codigo} value={pet.codigo}>
                        {pet.nome} {pet.tutor_nome ? `(Tutor: ${pet.tutor_nome})` : ''}
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
          <Button variant="primary" type="submit">Salvar Agendamento</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default Formulario;