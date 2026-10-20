export const getPetsAPI = async () => {
  const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/pet`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await response.json();
  return data;
};

export const deletePetPorCodigoAPI = async (codigo) => {
  const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/pet/${codigo}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await response.json();
  return data;
};