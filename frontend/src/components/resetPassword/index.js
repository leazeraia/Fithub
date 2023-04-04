import React from 'react';
import "./resetPassword.css" ;
import Header from '../Header' ;


function ResetPassword() {

    // const [reset, setReset] = useState('');

    // const handleReset = async (event) => {
    //     event.preventDefault();

    //     const formData = new FormData();
    //     formData.append("resetPassword", resetPassword);
 
    // const result = fetch("",{
    //     headers:{"Content-Type": "application/json"},
    //     method: "post",
    //     body: JSON.stringify(formData)
    // })
   
  return (
    <>
    
    <div className="container-resetPassword">
        <form className='form-resetPassword'>
            <div className='reset-text'>
                <label htmlFor='resetPassword'> Veuillez saisir votre e-mail </label>
            </div>
            <input type="email" placeholder='doudou@gmail.com' name="resetPassword"/>
            <div className="btn-resetPassword">
                <button type="submit" >Envoyer</button>
            </div>
        </form>
    </div>
    </>
  )
}

export default ResetPassword;
