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
import Signup from '../Signup';
import Profile from '../Profile';
import Footer from '../Footer';
import Contacts from '../Footer/Contacts';
import Users from '../Users';
import Mentionslegales from '../Footer/MentionsLegales';

// == Composant
function App() {
  return (  
    <BrowserRouter>
      <Header/>  
      <Routes>

         <Route path="/" element={<Home/>} />
         <Route path="/signup" element={<Signup />}/>
         <Route path="/profiles" element={<Users />} />
         <Route path="/profiles/:id" element={<Profile name="Quentin" />} />
         <Route path="/reset-password" element={<ResetPassword/>} />
         <Route path="/contacts" element={<Contacts />} />
         <Route path="/mentionslegales" element={<Mentionslegales/>} />

      </Routes> 
      <Footer />
    </BrowserRouter>
  );
}
     
// == Export
export default App;