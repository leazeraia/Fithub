import './styles.scss';

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import imgchoice from 'src/assets/images/imgchoice.png';
import closebtn from 'src/assets/images/closebtn.png';

function SettingsButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const { userId } = useParams();
  const navigate = useNavigate();
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

  function handleSettings() {
    setIsModalOpen(true);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (password) {
      if (password !== confirmPassword) {
      // les mots de passe ne correspondent pas
        alert('Le mot de passe et la confirmation du mot de passe ne correspondent pas.');
      }
      else {
      // les mots de passe correspondent
      // inscrire l'utilisateur ici
      }
    }

    const hasMinimumLength = password.length >= 8;
    const hasSpecialChar = /^(?=.*[A-Z])(?=.*[&@!$#*])(?=.*[0-9]).{8,50}$/.test(password);

    if (password) {
      if (!hasMinimumLength || !hasSpecialChar) {
        alert(' le mot de passe doit avoir au moins 8 caractères, une majuscule et un caractère spécial !');
        return;
      }
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

    const response = await fetch(`https://ynck-hng-server.eddi.cloud:8080/user/${userId}`, {
      method: 'PATCH',
      credentials: 'include',
      body: (formData),
    });

    if (response.ok) {
      event.target.querySelectorAll(('input')).forEach((input) => {
        console.log(input.value);
        input.value = '';
      });
      navigate(`/profiles/${userId}`);
      setIsModalOpen(false);
      console.log('modifications enregistrées');
    }
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <div className="settingsButton">
        <i className="fa-solid fa-gear settingsButton__button" onClick={handleSettings} />
      </div>
      {isModalOpen && (
      <div className="settingsModal">
        <form onSubmit={handleSubmit} className="signup-form">
        <i className="fa-regular fa-circle-xmark settingsModal__closeButton" onClick={handleCloseModal} />
          <div className="signup-form-content">

            <div className="signup-form-column">
              <div className="signup-form-group">
                <div>
                  <label htmlFor="lastname">Nom : </label>
                </div>
                <input type="text" id="lastname" name="lastName" onChange={handleLastNameChange} />
              </div>

              <div className="signup-form-group">
                <div>
                  <label htmlFor="firstname">Prénom :</label>
                </div>
                <input type="text" id="firstname" name="firstName" onChange={handleFirstNameChange} />
              </div>

              <div className="signup-form-group">
                <div>
                  <label htmlFor="nickname">Pseudo: </label>
                </div>
                <input type="text" id="nickname" name="lastName" onChange={handleNickNameChange} />
              </div>

              <div className="signup-form-group">
                <div>
                  <label htmlFor="email">Email :</label>
                </div>
                <input type="email" name="email" onChange={handleEmailChange} />
              </div>

              <div className="signup-form-group">
                <div>
                  <label htmlFor="password">Nouveau mot de passe : </label>
                  <p className="label-password">Votre mot de passe doit contenir une majuscule, 1 caractère spécial (&@!$#*) et minimum 8 caractères. </p>
                </div>
                <input type="password" id="password" name="password" onChange={handlePasswordChange} />
              </div>

              <div className="signup-form-group">
                <div>
                  <label htmlFor="confirmPassword">Confirmez votre nouveau mot de passe : </label>
                </div>
                <input type="password" id="confirmPassword" name="confirmPassword" onChange={handleConfirmPasswordChange} />
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
                  <span className="choice-photo-label">Modifier Photo</span>
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
                <input type="text" id="phone" name="phone" onChange={handlePhoneChange} />
              </div>

              <div className="signup-form-group">
                <div>
                  <label htmlFor="age">Age : </label>
                </div>
                <input type="text" id="age" name="age" onChange={handleAgeChange} />

              </div>

              <div className="signup-form-group">
                <div>
                  <label htmlFor="gender"> Sexe :</label>
                </div>
                <select id="gender" name="gender" onChange={handleGenderChange}>
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
                <input type="text" id="weight" name="weigth" onChange={handleWeightChange} />
              </div>

              <div className="signup-form-group">
                <div>
                  <label htmlFor="height"> Taille (cm): </label>
                </div>
                <input type="text" id="height" name="height" onChange={handleHeightChange} />
              </div>

            </div>

          </div>

          <div className="signup-form-button">
            <button type="submit">Envoyer</button>
          </div>
        </form>
      </div>
      )}
    </>
  );
}

export default SettingsButton;
