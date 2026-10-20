import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Menu from './componentes/Menu';
import Home from './componentes/Home';
import Sobre from './componentes/Sobre';
import Tutor from './componentes/telas/tutor/Tutor';
import Pet from './componentes/telas/pet/Pet';
import Agendamento from './componentes/telas/agendamento/Agendamento';

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
        path: "tutores",
        element: <Tutor />,
      },
      {
        path: "pets",
        element: <Pet />,
      },
      {
        path: "agendamentos",
        element: <Agendamento />,
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