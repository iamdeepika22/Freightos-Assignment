import './App.css';
import './style.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const CharacterPage = lazy(() => import("./pages/CharacterPage"));


function App () {
  return (
    <BrowserRouter>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Routes>
          <Route path="/" element={<CharacterPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;