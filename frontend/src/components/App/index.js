// == Import

import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './styles.css';
//import du dossier home
import Home from '../Home'; 
import ResetPassword from "../resetPassword";
import Header from "../Header";
import Footer from '../Footer';

// == Composant
function App() {
  return (  
    <BrowserRouter>
      <Header/>  
      <Routes>

         <Route path="/" element={<Home/>} />
         <Route path="/signup" element={"<h1>Hello</h1>"}/>
         <Route path="/reset-password" element={<ResetPassword/>} />

      </Routes> 
      <Footer />
    </BrowserRouter>
  );
}
     
// == Export
export default App;