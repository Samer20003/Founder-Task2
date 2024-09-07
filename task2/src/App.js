import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/LoginPage"
import Regstraion from './pages/Regstraion';
import HomePage from './pages/HomePage';
import NavBar from "./components/NavBar"
function App() {
  return (
    <>
   <BrowserRouter>
      <Routes>
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/Regstraion" element={<Regstraion />} />
        <Route path="/HomePage" element={<HomePage />} />
      </Routes>
   </BrowserRouter>
    </>
  );
}

export default App;
