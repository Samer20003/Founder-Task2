import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/LoginPage"
import Regstraion from './pages/Regstraion';
import HomePage from './pages/HomePage';
import {LoggedInUserProvider} from "./Context/logedInUser"
import ListView from './components/ListPosts';
import AddAndUpdatePage from './pages/AddAndUpdatePage';
import Protected from './Routes/Protected';

function App() {

  return (
    <LoggedInUserProvider>
     <BrowserRouter>
      <Routes>
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/Regstraion" element={<Regstraion />} />
        <Route 
            path="/HomePage" 
            element={
              <Protected>
                <HomePage />
              </Protected>
            } 
          />
          <Route 
            path="/ListView" 
            element={
              <Protected>
                <ListView />
              </Protected>
            } 
          />
          <Route 
            path="/updateAndAddPost/:id" 
            element={
              <Protected>
                <AddAndUpdatePage />
              </Protected>
            } 
          />


     

      </Routes>
   </BrowserRouter>
    </LoggedInUserProvider>
  );
}

export default App;
