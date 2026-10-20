import { useEffect, useState } from "react";
import { getPetsAPI, deletePetPorCodigoAPI } from "../../../servicos/PetServico";
import PetContext from "./PetContext";
import Tabela from "./Tabela";

function Pet() {
  const [listaObjetos, setListaObjetos] = useState([]);

  const recuperaPets = async () => {
    setListaObjetos(await getPetsAPI());
  };

  const remover = async (codigo) => {
    if (window.confirm("Deseja remover este pet?")) {
      await deletePetPorCodigoAPI(codigo);
      recuperaPets();
    }
  };

  useEffect(() => {
    recuperaPets();
  }, []);

  return (
    <PetContext.Provider value={{
      listaObjetos,
      remover
    }}>
      <Tabela />
    </PetContext.Provider>
  );
}

export default Pet;