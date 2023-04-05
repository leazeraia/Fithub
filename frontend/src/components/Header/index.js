import React, { useState } from 'react'
import logo from '../../assets/images/Logo_black.png'
import buttonLogin from '../../assets/images/img-signin.png'
import './header.css';
import { json, Link } from 'react-router-dom';

function Header() {
    
    //const Search = () => {
        const [isFormVisible, setisFormVisible] = useState(false);
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('')
        const toggleFormVisibility = () => { 
            setisFormVisible(!isFormVisible);
        }

        

        const handleSubmit = async (event) => {
            event.preventDefault();

            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);
     
        const result = fetch("",{
            headers:{"Content-Type": "application/json"},
            method: "post",
            body: JSON.stringify(formData)
        })
       
    
    }
  return (
     <nav className='header-nav'>
        <div className='logo-nav'>
            <Link to="/" className='link-logo-nav'>
             <img src={logo} alt='logo FitHub'/>
            </Link> 
               
        </div>

        <div className='link-nav'>
           <ul>

           <li> <Link to="/profiles">Membres</Link></li>

            <li> <Link to="/signup"> S'inscrire</Link></li>
            
            <li className='login-nav'>
                    <p> Se connecter </p> 
                <img src={buttonLogin} onClick={toggleFormVisibility} className='button-image-nav' alt='button se connecter'/>
                {isFormVisible && (
                <form onSubmit={handleSubmit} className='form-login'>
                    <div className='form-group'>
                        <div>
                            <label htmlFor='email' >E-mail</label>
                        </div>
                        <input type='email' value={email} onChange={(event)=> setEmail(event.target.value)} name='email' id='email'/>
                    </div>

                    <div className='form-group form-group-password' >
                        <div>
                            <label htmlFor='passeword' >Mot de Passe</label>
                        </div>
                        <input type='passeword' value={password} onChange={(event)=> setPassword(event.target.value)} name='passeword' id='passeword'/>
                    </div>
                    <Link to="/reset-password" className='passwordforget'>
                        Mot de passe oublié
                    </Link>
                    <div className='btn-submit'>
                        <button type='submit'> Connecter</button>
                    </div>

                </form>
                )}
                
            </li>
           </ul> 
        </div>

     </nav>
  )
}

export default Header ;
