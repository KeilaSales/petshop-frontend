import { useEffect, useState } from "react";
import { getPetsAPI, deletePetPorCodigoAPI, cadastraPetAPI } from "../../../servicos/PetServico";import PetContext from "./PetContext";
import { getTutoresAPI } from "../../../servicos/TutorServico";
import Tabela from "./Tabela";
import Formulario from "./Formulario";
import PetContext from "./PetContext";


function Pet() {
  const [listaObjetos, setListaObjetos] = useState([]);
  const [exibirForm, setExibirForm] = useState(false);
  const [objeto, setObjeto] = useState({ codigo: 0, nome: "", especie: "", raca: "", tutor: "" });
  const [listaTutores, setListaTutores] = useState([]);

  const recuperaPets = async () => {
    setListaObjetos(await getPetsAPI());
  };

  const recuperaTutores = async () => {
    setListaTutores(await getTutoresAPI());
  };

  const novoObjeto = () => {
    setObjeto({ codigo: 0, nome: "", especie: "", raca: "", tutor: "" });
    setExibirForm(true);
  };
  
  const editarObjeto = (pet) => {
    setObjeto(pet);
    setExibirForm(true);
  };

  const acaoCadastrar = async (e) => {
    e.preventDefault();
    const metodo = objeto.codigo === 0 ? "POST" : "PUT";
    await cadastraPetAPI(metodo, objeto);
    recuperaPets();
    setExibirForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setObjeto({ ...objeto, [name]: value });
  };

  const remover = async (codigo) => {
    if (window.confirm("Deseja remover este pet?")) {
      await deletePetPorCodigoAPI(codigo);
      recuperaPets();
    }
  };

  useEffect(() => {
    recuperaPets();
    recuperaTutores();
  }, []);

  return (
    <PetContext.Provider value={{
      listaObjetos,
      listaTutores,
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
    </PetContext.Provider>
  );
}

export default Pet;