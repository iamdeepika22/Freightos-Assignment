import './App.css';
import './style.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";

const CharacterPage = lazy(() => import("./pages/CharacterPage"));

const App = () => {
  return (
    <BrowserRouter>
    <Router>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Routes>
          <Route path="/" element={<CharacterPage />} />
        </Routes>
      </Suspense>
    </Router>
    </BrowserRouter>
  );
}

export default App;