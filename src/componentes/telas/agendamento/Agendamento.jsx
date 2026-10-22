//Componente pai que gerencia o estado global (Context API) 
// da tela de agendamento/pet/tutor, compartilhando as 
// listas de objetos, alertas , funções de exclusão 
// e formulário entre os componentes filhos (Tabela e 
// Formulario) sem passar props manualmente.

import { useEffect, useState } from "react";
import { getAgendamentosAPI, deleteAgendamentoPorCodigoAPI, cadastraAgendamentoAPI } from "../../../servicos/AgendamentoServico";
import { getPetsAPI } from "../../../servicos/PetServico";
import AgendamentoContext from "./AgendamentoContext";
import Tabela from "./Tabela";
import Formulario from "./Formulario";

function Agendamento() {
  const [listaObjetos, setListaObjetos] = useState([]);
  const [listaPets, setListaPets] = useState([]);
  const [exibirForm, setExibirForm] = useState(false);
  const [objeto, setObjeto] = useState({ codigo: 0, servico: '', data_agendamento: '', valor: '', pet: '' });

  const recuperaAgendamentos = async () => {
    setListaObjetos(await getAgendamentosAPI());
  };

  const recuperaPets = async () => {
    setListaPets(await getPetsAPI());
  };

  const novoObjeto = () => {
    setObjeto({ codigo: 0, servico: '', data_agendamento: '', valor: '', pet: '' });
    setExibirForm(true);
  };  

  const editarObjeto = (agendamento) => {
    setObjeto(agendamento);
    setExibirForm(true);
  };

  const acaoCadastrar = async (e) => {
    e.preventDefault();
    const metodo = objeto.codigo === 0 ? "POST" : "PUT";
    await cadastraAgendamentoAPI(objeto, metodo);
    setExibirForm(false);
    recuperaAgendamentos();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setObjeto({ ...objeto, [name]: value });
  };

  const remover = async (codigo) => {
    if (window.confirm("Deseja remover este agendamento?")) {
      await deleteAgendamentoPorCodigoAPI(codigo);
      recuperaAgendamentos();
    }
  };

  useEffect(() => {
    recuperaAgendamentos();
    recuperaPets(); 
  }, []);

  return (
    <AgendamentoContext.Provider value={{
      listaObjetos,
      listaPets,
      remover,
      novoObjeto,
      editarObjeto,
      objeto,
      handleChange,
      acaoCadastrar,
      exibirForm,
      setExibirForm
    }}>
      <Tabela />
      <Formulario />
    </AgendamentoContext.Provider>
  );
}

export default Agendamento;