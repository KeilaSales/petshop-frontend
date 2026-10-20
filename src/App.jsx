import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Menu from './componentes/Menu';
import Home from './componentes/Home';
import Sobre from './componentes/Sobre';
import Login from './componentes/Login';
import Tutor from './componentes/telas/tutor/Tutor';
import Pet from './componentes/telas/pet/Pet';
import Agendamento from './componentes/telas/agendamento/Agendamento';


const RotaProtegida = ({ children }) => {
  const logado = localStorage.getItem('usuarioLogado') === 'true';
  return logado ? children : <Navigate to="/login" replace />;
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "tutores",
        element: <RotaProtegida><Tutor /></RotaProtegida>,
      },
      {
        path: "pets",
        element: <RotaProtegida><Pet /></RotaProtegida>,
      },
      {
        path: "agendamentos",
        element: <RotaProtegida><Agendamento /></RotaProtegida>,
      },
      {
        path: "sobre",
        element: <Sobre />,
      }
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;