import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/LoginPage"
import Regstraion from './pages/Regstraion';
import HomePage from './pages/HomePage';
import NavBar from "./components/NavBar"
import Post from './components/Post';
import {LoggedInUserProvider} from "./Context/logedInUser"
import ListView from './components/ListPosts';
function App() {
  return (
    <LoggedInUserProvider>
   <BrowserRouter>
      <Routes>
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/Regstraion" element={<Regstraion />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/ListView" element={<ListView />} />

      </Routes>
   </BrowserRouter>
    </LoggedInUserProvider>
  );
}

export default App;
