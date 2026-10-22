//telas = todas as pastas = Tabela.jsx é o componente 
// de listagem em tabela responsiva do Bootstrap com 
// botões de ação (editar e excluir) para cada agendamento/pet/tutor.

import { useContext } from "react";
import AgendamentoContext from "./AgendamentoContext";
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';

function Tabela() {
 const { listaObjetos, remover, novoObjeto, editarObjeto } = useContext(AgendamentoContext);  
 
 return (
    <div style={{ padding: '20px' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold text-primary">Gerenciamento de Agendamentos</h2>
        <Button variant="success" onClick={() => novoObjeto && novoObjeto()}>
          <i className="bi bi-plus-circle me-1"></i> Novo Cadastro
        </Button>
      </div>
      
      {listaObjetos.length === 0 && <h4>Nenhum agendamento encontrado</h4>}
      {listaObjetos.length > 0 && (
        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>Ações</th>
              <th>Código</th>
              <th>Serviço</th>
              <th>Data</th>
              <th>Valor (R$)</th>
              <th>Pet</th>
            </tr>
          </thead>
          <tbody>
            {listaObjetos.map((objeto) => (
              <tr key={objeto.codigo}>
                <td align="center">
                  <Button variant="warning" size="sm" className="me-2" onClick={() => editarObjeto(objeto)}>
                      Editar
                  </Button>
                 <Button variant="danger" size="sm" onClick={() => remover(objeto.codigo)}>
                      Excluir
                 </Button>
                </td>
                <td>{objeto.codigo}</td>
                <td>{objeto.servico}</td>
                <td>{objeto.data_agendamento}</td>
                <td>{objeto.valor}</td>
                <td>{objeto.pet_nome}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Tabela;