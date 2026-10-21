import { useEffect, useState } from "react";
import { getTutoresAPI, deleteTutorPorCodigoAPI, cadastraTutorAPI } from "../../../servicos/TutorServico";
import TutorContext from "./TutorContext";
import Tabela from "./Tabela";
import Formulario from "./Formulario";

function Tutor() {
  const [listaObjetos, setListaObjetos] = useState([]);
  const [exibirForm, setExibirForm] = useState(false);
  const [objeto, setObjeto] = useState({ codigo: 0, nome: "", telefone: "", email: "" });

  const recuperaTutores = async () => {
    setListaObjetos(await getTutoresAPI());
  };

  const novoObjeto = () => {
    setObjeto({ codigo: 0, nome: "", telefone: "", email: "" });
    setExibirForm(true);
  };

  const editarObjeto = (tutor) => {
    setObjeto(tutor);
    setExibirForm(true);
  };

  const acaoCadastrar = async (e) => { 
   const metodo = objeto.codigo === 0 ? "POST" : "PUT";
   await cadastraTutorAPI(objeto, metodo);
   setExibirForm(false);
   recuperaTutores();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setObjeto({ ...objeto, [name]: value });
  };

  const remover = async (codigo) => {
    if (window.confirm("Deseja remover este tutor?")) {
      await deleteTutorPorCodigoAPI(codigo);
      recuperaTutores();
    }
  };

  useEffect(() => {
    recuperaTutores();
  }, []);

  return (
    <TutorContext.Provider value={{
      listaObjetos,
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
    </TutorContext.Provider>
  );
}

export default Tutor;