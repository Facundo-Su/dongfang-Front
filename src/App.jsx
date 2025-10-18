import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Inicio from "./paginas/Inicio";
import FormularioVolante from "./paginas/FormularioVolante";

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
