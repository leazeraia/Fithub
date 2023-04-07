/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import logo from 'src/assets/images/logo.png';
import image from 'src/assets/images/image.jpg';
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
  const handlePhotoChange = (event) => setPhoto(event.target.files[0]);

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
      // les mots de passe ne correspondent pas
      alert('Le mot de passe et la confirmation du mot de passe ne correspondent pas.');
    }
    else {
      // les mots de passe correspondent
      // inscrire l'utilisateur ici
    }

    const formData = new FormData();

    formData.append('firstname', firstName);
    formData.append('lastname', lastName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('passwordConfirm', confirmPassword);
    formData.append('phone', phone);
    formData.append('age', age);
    formData.append('gender', gender);
    formData.append('weight', weight);
    formData.append('height', height);
    formData.append('image', photo);

    // const data = {
    //   firstname: firstName,
    //   lastname: lastName,
    //   nickname: nickName,
    //   email,
    //   password,
    //   passwordConfirm: confirmPassword,
    //   phone,
    //   age,
    //   gender,
    //   weight,
    //   height,
    // };

    fetch('https://ynck-hng-server.eddi.cloud:8080/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      if (response.ok) {
        console.log('Inscription réussie.');
      }
      else {
        console.log('Erreur lors de l\'inscription.');
      }
    })
      .catch((error) => {
        console.log('Une erreur est survenue :', error);
      });

    // Empecher la page de se recharger
    // Envoi de la requête d'inscription à l'API
    // et traitement de la réponse ici
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
              </div>
              <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} />
            </div>

            <div className="signup-form-group">
              <div>
                <label htmlFor="confirmPassword">Confirmer Mot de passe : </label>
              </div>
              <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} />
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
              </select>
            </div>

            <div className="signup-form-group">
              <div>
                <label htmlFor="weigth">Poids : </label>
              </div>
              <input type="text" id="weight" name="weigth" value={weight} onChange={handleWeightChange} />
            </div>

            <div className="signup-form-group">
              <div>
                <label htmlFor="height"> Taille : </label>
              </div>
              <input type="text" id="height" name="height" value={height} onChange={handleHeightChange} />
            </div>

            <div className="signup-form-group">
              <div>
                <label htmlFor="photo"> Photo de profil: </label>
              </div>
              <input type="file" id="photo" name="image" accept="image/png, image/jpeg, image/jpg" />
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
