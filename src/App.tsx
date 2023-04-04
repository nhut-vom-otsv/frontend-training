import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contexts from "./context/Contexts";
import { publicRoutes } from "./constants/data";

function App() {
  return (
    <Contexts>
      <Router>
        <Routes>
          {publicRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                route.layout ? (
                  <route.layout>
                    <route.component />
                  </route.layout>
                ) : (
                  <route.component />
                )
              }
            />
          ))}
        </Routes>
      </Router>
    </Contexts>
  );
}

export default App;
