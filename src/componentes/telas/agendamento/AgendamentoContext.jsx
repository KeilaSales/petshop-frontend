//telas = todos as pastas = ...Context é Provedor do 
// estado global (Context API) que compartilha as 
// listas de objetos, alertas, funções de exclusão e 
// formulário entre componentes sem passar props 
// manualmente

import React from 'react';

const AgendamentoContext = React.createContext();

export default AgendamentoContext;