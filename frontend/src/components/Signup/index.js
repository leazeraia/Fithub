import React, { useState } from 'react';
import logo from 'src/assets/images/logo.png';
import image from 'src/assets/images/image.jpg';
import './styles.scss';

//Stockage des données de l'utilisateur dans le state
function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState(''); // le tél est facultatif
  const [age, setAge] = useState('');
  const [gender, setGender] = useState(''); // le sexe est facultatif pour cette 1ère version
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');


  //Récupération de la valeur entré par l'utilisateur
  const handleFirstNameChange = (event) => setFirstName(event.target.value);
  const handleLastNameChange = (event) => setLastName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleConfirmPasswordChange = (event) => setConfirmPassword(event.target.value);
  const handlePhoneChange = (event) => setPhone(event.target.value);
  const handleAgeChange = (event) => setAge(event.target.value);
  const handleGenderChange = (event) => setGender(event.target.value);
  const handleWeightChange = (event) => setWeight(event.target.value);
  const handleHeightChange = (event) => setHeight(event.target.value);
  
  
  
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmPassword || !age || !weight || !height) {
      console.log('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Veuillez saisir une adresse email valide.');
      return;
    }

    if (password !== confirmPassword) {
      //les mots de passe ne correspondent pas
      alert("Le mot de passe et la confirmation du mot de passe ne correspondent pas.");
      }else {
        // les mots de passe correspondent
        // inscrire l'utilisateur ici
    }
    const formData = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phone,
      age,
      gender,
      weight,
      height
    };

    console.log(formData, "Veuillez remplir touts les champs obligatoires."); // Je vais afficher les données du formulaire dans la console
  
    // fetch('https://example.com/api/signup', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(formData)
    // })
    // .then(response => {
    //   if (response.ok) {
    //     console.log('Inscription réussie.');
    //   } else {
    //     console.log('Erreur lors de l\'inscription.');
    //   }
    // })
    // .catch(error => {
    //   console.log('Une erreur est survenue :', error);
    // });
  

    // Empecher la page de se recharger
    //Envoi de la requête d'inscription à l'API
    // et traitement de la réponse ici
  };

 
  return ( 
    <div className="signup-container"> 
       <div className="signup-title">
          <h1>S'inscrire</h1> 
       </div>

    <form onSubmit={handleSubmit} className="signup-form">
      <div className='signup-form-content'>

      <div className="signup-form-column"> 
        <div className='signup-form-group'>
            <div>
               <label htmlFor="lastname">Nom : </label>
            </div>
            <input type="text" id="lastname" value={lastName} onChange={handleLastNameChange} required />
        </div>
           
        <div  className='signup-form-group'>
            <div> 
               <label htmlFor="firstname">Prénom</label>
            </div>
            <input type="text" id="firstname" value={firstName} onChange={handleFirstNameChange} required/>
        </div>
          
        <div  className='signup-form-group'>
            <div>
              <label htmlFor="email">email</label>
            </div>
            <input type="email" value={email} onChange={handleEmailChange} required />
        </div >

          <div  className='signup-form-group'> 
              <div>
               <label htmlFor="password">Mot de passe </label>
              </div>
              <input type="password" id="password" value={password} onChange={handlePasswordChange} required />
          </div>

          <div  className='signup-form-group'>
              <div>
               <label htmlFor="confirmPassword">Confirmer Mot de passe </label>
              </div>
             <input type="password" id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} required/>
         </div>

      </div>


      <div className="signup-form-column"> 
      <div  className='signup-form-group'>
         <div>
            <label htmlFor='phone'>Téléphone</label>
         </div>
         <input type="text" id="phone" value={phone}  onChange={handlePhoneChange} />
      </div>
    
      <div  className='signup-form-group'>
          <div>
              <label htmlFor='age'>Age : </label>
          </div>
          <input type="text" id="age" value={age} onChange={handleAgeChange} required />
     </div>

       <div  className='signup-form-group'>
          <div>
              <label htmlFor='gender'> Sexe :</label>
          </div>
          <select value={gender} id="gender" onChange={handleGenderChange} >
              <option>Sélectionner</option>
              <option value="F">Femme</option>
              <option value="M">Homme</option>
          </select>
       </div>

       <div className='signup-form-group'>
          <div>
            <label htmlFor='weigth'>Poids : </label>
          </div>
            <input type="text" id="weight" value={weight} onChange={handleWeightChange} required />
       </div>

       <div className='signup-form-group' >
           <div>
              <label htmlFor='height'> Taille : </label>
           </div>
           <input type="text" id="height" value={height} onChange={handleHeightChange} required />
       </div>

    </div>

    </div>

    <div className="signup-form-button">
         <button type="submit">Envoyer</button>
    </div> 

  </form>
</div>
  )}; 


export default Signup;

