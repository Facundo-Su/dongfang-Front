// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./paginas/Inicio";
import FormularioVolante from "./paginas/FormularioVolante";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Inicio />}
        />
        <Route
          path="/productos/volante"
          element={<FormularioVolante />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
