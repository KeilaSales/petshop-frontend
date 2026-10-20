export const getAgendamentosAPI = async () => {
  const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/agendamento`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await response.json();
  return data;
};

export const deleteAgendamentoPorCodigoAPI = async (codigo) => {
  const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/agendamento/${codigo}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await response.json();
  return data;
};