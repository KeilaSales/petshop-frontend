import { useContext } from "react";
import TutorContext from "./TutorContext";
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';

function Tabela() {
  const { listaObjetos, remover } = useContext(TutorContext);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Gerenciamento de Tutores</h1>
      {listaObjetos.length === 0 && <h4>Nenhum tutor encontrado</h4>}
      {listaObjetos.length > 0 && (
        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>Ações</th>
              <th>Código</th>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {listaObjetos.map((objeto) => (
              <tr key={objeto.codigo}>
                <td align="center">
                  <Button variant="danger" onClick={() => remover(objeto.codigo)}>
                    <i className="bi bi-trash"></i> Excluir
                  </Button>
                </td>
                <td>{objeto.codigo}</td>
                <td>{objeto.nome}</td>
                <td>{objeto.telefone}</td>
                <td>{objeto.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Tabela;