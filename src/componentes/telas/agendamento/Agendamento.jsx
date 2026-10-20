import { useEffect, useState } from "react";
import { getAgendamentosAPI, deleteAgendamentoPorCodigoAPI } from "../../../servicos/AgendamentoServico";
import AgendamentoContext from "./AgendamentoContext";
import Tabela from "./Tabela";

function Agendamento() {
  const [listaObjetos, setListaObjetos] = useState([]);

  const recuperaAgendamentos = async () => {
    setListaObjetos(await getAgendamentosAPI());
  };

  const remover = async (codigo) => {
    if (window.confirm("Deseja remover este agendamento?")) {
      await deleteAgendamentoPorCodigoAPI(codigo);
      recuperaAgendamentos();
    }
  };

  useEffect(() => {
    recuperaAgendamentos();
  }, []);

  return (
    <AgendamentoContext.Provider value={{
      listaObjetos,
      remover
    }}>
      <Tabela />
    </AgendamentoContext.Provider>
  );
}

export default Agendamento;