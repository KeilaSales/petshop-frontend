import { useEffect, useState } from "react";
import { getTutoresAPI, deleteTutorPorCodigoAPI } from "../../../servicos/TutorServico";
import TutorContext from "./TutorContext";
import Tabela from "./Tabela";

function Tutor() {
  const [listaObjetos, setListaObjetos] = useState([]);

  const recuperaTutores = async () => {
    setListaObjetos(await getTutoresAPI());
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
      remover
    }}>
      <Tabela />
    </TutorContext.Provider>
  );
}

export default Tutor;