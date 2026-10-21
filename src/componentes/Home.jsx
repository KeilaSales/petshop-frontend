import { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { getAgendamentosAPI, cadastraAgendamentoAPI } from '../servicos/AgendamentoServico';
import { getTutoresAPI, cadastraTutorAPI } from '../servicos/TutorServico';
import { getPetsAPI, cadastraPetAPI } from '../servicos/PetServico';

function Home() {
  const [tutores, setTutores] = useState([]);
  const [pets, setPets] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);

  const [tutorExistente, setTutorExistente] = useState('');
  const [nomeTutor, setNomeTutor] = useState('');
  const [telefoneTutor, setTelefoneTutor] = useState('');
  const [emailTutor, setEmailTutor] = useState('');

  const [nomePet, setNomePet] = useState('');
  const [especiePet, setEspeciePet] = useState('Cão');
  const [racaPet, setRacaPet] = useState('');

  const [servico, setServico] = useState('');
  const [dataAgendamento, setDataAgendamento] = useState('');
  const [horario, setHorario] = useState('09:00');
  const [alerta, setAlerta] = useState({ show: false, variant: '', msg: '' });

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const listT = await getTutoresAPI();
      const listP = await getPetsAPI();
      const listA = await getAgendamentosAPI();
      setTutores(listT || []);
      setPets(listP || []);
      setAgendamentos(listA || []);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAgendarPublico = async (e) => {
    e.preventDefault();
    setAlerta({ show: false, variant: '', msg: '' });

    if (!servico || !dataAgendamento || !horario) {
      setAlerta({ show: true, variant: 'danger', msg: 'Preencha todos os campos do agendamento!' });
      return;
    }

    const servicoFormatado = `${servico} (${horario})`;
    const conflito = agendamentos.some(
      a => a.data_agendamento === dataAgendamento && a.servico === servicoFormatado
    );

    if (conflito) {
      setAlerta({
        show: true,
        variant: 'danger',
        msg: 'Já existe um agendamento para este serviço no mesmo dia e horário! Por favor, escolha outro horário.'
      });
      return;
    }

    try {
      let codTutor = tutorExistente;

      if (!codTutor) {
        if (!nomeTutor || !telefoneTutor || !emailTutor) {
          setAlerta({ show: true, variant: 'danger', msg: 'Informe os dados completos do tutor!' });
          return;
        }
        const resTutor = await cadastraTutorAPI(
          { codigo: 0, nome: nomeTutor, telefone: telefoneTutor, email: emailTutor },
          'POST'
        );
        codTutor = resTutor.objeto ? resTutor.objeto.codigo : resTutor.codigo;
      }

      if (!nomePet || !racaPet) {
        setAlerta({ show: true, variant: 'danger', msg: 'Informe os dados do Pet!' });
        return;
      }

      const resPet = await cadastraPetAPI(
        { codigo: 0, nome: nomePet, especie: especiePet, raca: racaPet, tutor: codTutor },
        'POST'
      );
      const codPet = resPet.objeto ? resPet.objeto.codigo : resPet.codigo;

      let valor = 50.0;
      if (servico.includes('Tosa Higiênica')) valor = 40.0;
      if (servico.includes('Somente Tosa')) valor = 70.0;
      if (servico.includes('Banho e Tosa Completa')) valor = 110.0;
      if (servico.includes('Hidratação de Pelagem')) valor = 65.0;
      if (servico.includes('Consulta Veterinária')) valor = 130.0;
      if (servico.includes('Corte de Unhas e Limpeza de Ouvidos')) valor = 30.0;


      await cadastraAgendamentoAPI(
        {
          codigo: 0,
          servico: servicoFormatado,
          data_agendamento: dataAgendamento,
          valor: valor,
          pet: codPet
        },
        'POST'
      );

      setAlerta({ show: true, variant: 'success', msg: 'Agendamento e cadastro realizados com sucesso!' });
      carregarDados();
      setNomeTutor('');
      setTelefoneTutor('');
      setEmailTutor('');
      setNomePet('');
      setRacaPet('');
      setDataAgendamento('');
    } catch (err) {
      setAlerta({ show: true, variant: 'danger', msg: 'Erro ao processar o agendamento: ' + err.message });
    }
  };

  return (
    <Container className="mt-4">
      <Card className="border-0 shadow-sm p-4 bg-light mb-4 text-center">
        <h1 className="fw-bold text-primary">🐾 Sistema para Petshop</h1>
        <p className="text-secondary fs-5">Agende o serviço para o seu pet de forma rápida e prática!</p>
      </Card>

      {alerta.show && (
        <Alert variant={alerta.variant} onClose={() => setAlerta({ show: false })} dismissible>
          {alerta.msg}
        </Alert>
      )}

      <Card className="shadow-sm border-0 p-4">
        <h3 className="fw-bold text-primary mb-3">📅 Agendamento de Serviço Público</h3>
        <Form onSubmit={handleAgendarPublico}>
          <h5 className="fw-bold text-secondary mt-2">1. Dados do Tutor</h5>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Selecione se já é cliente ou deixe em branco para novo:</Form.Label>
              <Form.Select value={tutorExistente} onChange={e => setTutorExistente(e.target.value)}>
                <option value="">-- Novo Tutor --</option>
                {tutores.map(t => (
                  <option key={t.codigo} value={t.codigo}>
                    {t.nome} ({t.email})
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>

          {!tutorExistente && (
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label>Nome do Tutor *</Form.Label>
                <Form.Control
                  type="text"
                  value={nomeTutor}
                  onChange={e => setNomeTutor(e.target.value)}
                  required
                  placeholder="Ex: Maria Silva"
                />
              </Col>
              <Col md={4}>
                <Form.Label>Telefone *</Form.Label>
                <Form.Control
                  type="text"
                  value={telefoneTutor}
                  onChange={e => setTelefoneTutor(e.target.value)}
                  required
                  placeholder="(54) 99999-0000"
                />
              </Col>
              <Col md={4}>
                <Form.Label>E-mail *</Form.Label>
                <Form.Control
                  type="email"
                  value={emailTutor}
                  onChange={e => setEmailTutor(e.target.value)}
                  required
                  placeholder="maria@email.com"
                />
              </Col>
            </Row>
          )}

          <h5 className="fw-bold text-secondary mt-3">2. Dados do Pet</h5>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Label>Nome do Pet *</Form.Label>
              <Form.Control
                type="text"
                value={nomePet}
                onChange={e => setNomePet(e.target.value)}
                required
                placeholder="Ex: Bob"
              />
            </Col>
            <Col md={4}>
              <Form.Label>Espécie *</Form.Label>
              <Form.Select value={especiePet} onChange={e => setEspeciePet(e.target.value)}>
                <option value="Cão">Cão</option>
                <option value="Gato">Gato</option>
                <option value="Ave">Ave</option>
                <option value="Outro">Outro</option>
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Label>Raça *</Form.Label>
              <Form.Control
                type="text"
                value={racaPet}
                onChange={e => setRacaPet(e.target.value)}
                required
                placeholder="Ex: Poodle"
              />
            </Col>
          </Row>

          <h5 className="fw-bold text-secondary mt-3">3. Escolha do Serviço e Horário</h5>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Label>Serviço *</Form.Label>
              <Form.Select value={servico} onChange={e => setServico(e.target.value)} required>
                <option value="Somente Banho">Somente Banho (R$ 50,00)</option>
                <option value="Tosa Higiênica">Tosa Higiênica (R$ 40,00)</option>
                <option value="Somente Tosa">Somente Tosa (R$ 70,00)</option>
                <option value="Banho e Tosa Completa">Banho e Tosa Completa (R$ 110,00)</option>
                <option value="Hidratação de Pelagem">Hidratação de Pelagem (R$ 65,00)</option>
                <option value="Consulta Veterinária">Consulta Veterinária (R$ 130,00)</option>
                <option value="Corte de Unhas e Limpeza de Ouvidos">Corte de Unhas e Limpeza (R$ 30,00)</option>
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Label>Data *</Form.Label>
              <Form.Control
                type="date"
                value={dataAgendamento}
                onChange={e => setDataAgendamento(e.target.value)}
                required
              />
            </Col>
            <Col md={4}>
              <Form.Label>Horário *</Form.Label>
              <Form.Select value={horario} onChange={e => setHorario(e.target.value)}>
                <option value="08:00">08:00</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
              </Form.Select>
            </Col>
          </Row>

          <Button variant="success" type="submit" className="w-100 mt-2 fw-bold fs-5">
            Confirmar Agendamento
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default Home;