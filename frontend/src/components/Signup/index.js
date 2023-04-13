/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import closebtn from 'src/assets/images/closebtn.png';
import imgchoice from 'src/assets/images/imgchoice.png';

import './styles.scss';

// Stockage des données de l'utilisateur dans le state
function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState(''); // le tél est facultatif
  const [age, setAge] = useState('');
  const [gender, setGender] = useState(''); // le sexe est facultatif pour cette 1ère version
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [photo, setPhoto] = useState('');
  const [image, setImage] = useState('');

  const [checkImage, setCheckImage] = useState(false);
  // const [user, setUser] = useState('');


  // Récupération de la valeur entré par l'utilisateur
  const handleFirstNameChange = (event) => setFirstName(event.target.value);
  const handleLastNameChange = (event) => setLastName(event.target.value);
  const handleNickNameChange = (event) => setNickName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleConfirmPasswordChange = (event) => setConfirmPassword(event.target.value);
  const handlePhoneChange = (event) => setPhone(event.target.value);
  const handleAgeChange = (event) => setAge(event.target.value);
  const handleGenderChange = (event) => setGender(event.target.value);
  const handleWeightChange = (event) => setWeight(event.target.value);
  const handleHeightChange = (event) => setHeight(event.target.value);
  
  //  const handlePhotoChange = (event) => setPhoto(event.target.files[0]);

  // const handleUserChange = async (event) => {
  //   const result = await fetch('https://ynck-hng-server.eddi.cloud:8080/user/12');
  //   console.log(await result.json());
  // };
  const handlePreviewImage = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPhoto(reader.result);
        setImage(event.target.files[0]);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
    setCheckImage(true);
  };

  const handleClosePrewiewImage = () => {
    setPhoto('');
    setCheckImage(false);
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
  
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
      // les mots de passe ne correspondent pas
      alert('Le mot de passe et la confirmation du mot de passe ne correspondent pas.');
    }
    else {
      // les mots de passe correspondent
      // inscrire l'utilisateur ici
    }

    const hasMinimumLength = password.length >= 8;
    const hasSpecialChar = /^(?=.*[A-Z])(?=.*[&@!$#*])(?=.*[0-9]).{8,50}$/.test(password);

    if (!hasMinimumLength || !hasSpecialChar) {
      alert(' le mot de passe doit avoir au moins 8 caractères, une majuscule et un caractère spécial !');
      return;
    }
    // faire d'autres traitements ou envoyer le mot de passe au serveur

    const formData = new FormData();

    formData.append('firstname', firstName);
    formData.append('lastname', lastName);
    formData.append('nickname', nickName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('passwordConfirm', confirmPassword);
    formData.append('phone', phone);
    formData.append('age', age);
    formData.append('gender', gender);
    formData.append('weight', weight);
    formData.append('height', height);
    
    formData.append('image', image);

    const response = await fetch('https://ynck-hng-server.eddi.cloud:8080/user', {
      method: 'POST',
      body: (formData),
    });

    if (response.ok) {
      navigate('/');
    }
    // .then((response) => {
    //   console.log(response.ok);
    //   if (response.ok) {
    //     redirect('/');
    //   }
    // })
    //   .catch((error) => {
    //     console.log('Une erreur est survenue :', error);
    //   });
  };

  return (
    <div className="signup-container">
      <div className="signup-title">
        <h1>S'inscrire</h1>
      </div>

      <form onSubmit={handleSubmit} className="signup-form">
        <div className="signup-form-content">

          <div className="signup-form-column">
            <div className="signup-form-group">
              <div>
                <label htmlFor="lastname">Nom : </label>
              </div>
              <input type="text" id="lastname" name="lastName" value={lastName} onChange={handleLastNameChange} />
            </div>

            <div className="signup-form-group">
              <div>
                <label htmlFor="firstname">Prénom :</label>
              </div>
              <input type="text" id="firstname" name="firstName" value={firstName} onChange={handleFirstNameChange} />
            </div>

            <div className="signup-form-group">
              <div>
                <label htmlFor="nickname">Pseudo: </label>
              </div>
              <input type="text" id="nickname" name="lastName" value={nickName} onChange={handleNickNameChange} />
            </div>

            <div className="signup-form-group">
              <div>
                <label htmlFor="email">Email :</label>
              </div>
              <input type="email" value={email} name="email" onChange={handleEmailChange} />
            </div>

            <div className="signup-form-group">
              <div>
                <label htmlFor="password">Mot de passe : </label>
                <p className="label-password">Votre mot de passe doit contenir une majuscule, 1 caractère spécial (&@!$#*) et minimum 8 caractères. </p>
              </div>
              <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} />
            </div>

            <div className="signup-form-group">
              <div>
                <label htmlFor="confirmPassword">Confirmez votre mot de passe : </label>
              </div>
              <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} />
            </div>

          </div>

          <div className="signup-form-column signup-form-group-image">
            <div className="preview-image">
              {checkImage && (
                <div className="closebtn" onClick={handleClosePrewiewImage}>
                  <img src={closebtn} alt="fermeture bouton" />
                </div>
              )}
              {checkImage && (<img src={photo} alt="photo choisir" />)}
            </div>

            <div className="signup-form-group">

              <label htmlFor="photo" className="profil-image">
                <span className="choice-photo-label">Choisir Photo</span>
                <img className="choice-photo" src={imgchoice} />
              </label>

              <input type="file" id="photo" name="image" accept="image/png, image/jpeg, image/jpg" onChange={handlePreviewImage} />

            </div>
          </div>

          <div className="signup-form-column">
            <div className="signup-form-group">
              <div>
                <label htmlFor="phone">Téléphone (facultatif) :</label>
              </div>
              <input type="text" id="phone" name="phone" value={phone} onChange={handlePhoneChange} />
            </div>

            <div className="signup-form-group">
              <div>
                <label htmlFor="age">Age : </label>
              </div>
              <input type="text" id="age" name="age" value={age} onChange={handleAgeChange} />

            </div>

            <div className="signup-form-group">
              <div>
                <label htmlFor="gender"> Sexe :</label>
              </div>
              <select value={gender} id="gender" name="gender" onChange={handleGenderChange}>
                <option>Sélectionner</option>
                <option value="femme">Femme</option>
                <option value="homme">Homme</option>
                <option value="non-spécifié">Non-spécifié</option>
              </select>
            </div>

            <div className="signup-form-group">
              <div>
                <label htmlFor="weigth">Poids (kg): </label>
              </div>
              <input type="text" id="weight" name="weigth" value={weight} onChange={handleWeightChange} />
            </div>

            <div className="signup-form-group">
              <div>
                <label htmlFor="height"> Taille (cm): </label>
              </div>
              <input type="text" id="height" name="height" value={height} onChange={handleHeightChange} />
            </div>

          </div>

        </div>

        <div className="signup-form-button">
          <button type="submit">Envoyer</button>
        </div>
      </form>

    </div>
  );
}

export default Signup;
