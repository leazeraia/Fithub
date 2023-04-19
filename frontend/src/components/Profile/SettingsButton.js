/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
// import de la feuille de style
import './styles.scss';

// import des hooks
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// import du logo du changement d'image
import imgchoice from 'src/assets/images/imgchoice.png';

// composant SettingsButton
function SettingsButton() {
  // states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState(''); // facultatif
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [photo, setPhoto] = useState('');
  const [image, setImage] = useState('');
  const [checkImage, setCheckImage] = useState(false);

  // récupération du paramètre id de l'URL
  const { userId } = useParams();
  // récupération de la fonction navigate
  const navigate = useNavigate();

  // Récupération de la valeur entrée par l'utilisateur dans les champs de formulaire
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

  // prévisualisation de l'image
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

  // fermeture de l'image en prévisualisation
  const handleClosePrewiewImage = () => {
    setPhoto('');
    setCheckImage(false);
  };

  // ouverture de la modale
  function handleSettings() {
    setIsModalOpen(true);
  }

  // envoi des données du formulaire
  async function handleSubmit(event) {
    event.preventDefault();

    // si on la modification du mot de passe, on procède à des vérifications de la confirmation
    if (password) {
      // si les mots de passe ne correspondent pas
      if (password !== confirmPassword) {
      // on affiche un message d'erreur
        alert('Le mot de passe et la confirmation du mot de passe ne correspondent pas.');
      }
    }

    // vérification du mot de passe : au moins 8 caractères, une majuscule et un caractère spécial
    const hasMinimumLength = password.length >= 8;
    const hasSpecialChar = /^(?=.*[A-Z])(?=.*[&@!$#*])(?=.*[0-9]).{8,50}$/.test(password);

    // si on a modification du mot de passe, on procède à d'autres vérifications
    if (password) {
      // si le mot de passe ne respecte pas les conditions
      if (!hasMinimumLength || !hasSpecialChar) {
        // on affiche un message d'erreur
        alert(' le mot de passe doit avoir au moins 8 caractères, une majuscule et un caractère spécial !');
        return;
      }
    }

    // récupération des données du formulaire
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

    // envoi des données au serveur avec une requête PATCH (modification)
    const response = await fetch(`https://ynck-hng-server.eddi.cloud:8080/user/${userId}`, {
      method: 'PATCH',
      credentials: 'include',
      body: (formData),
    });

    // si la requête est ok, on vide les champs du formulaire et on ferme la modale
    // redirection vers la page de profil pour afficher les modifications directement
    if (response.ok) {
      event.target.querySelectorAll(('input')).forEach((input) => {
        input.value = '';
      });
      navigate(`/profiles/${userId}`);
      setIsModalOpen(false);
    }
  }

  // fermeture de la modale
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

            <div className="signup-form-column name">
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
                <i className="fa-regular fa-circle-xmark closebtn" onClick={handleClosePrewiewImage} />
                )}
                {checkImage && (<img src={photo} alt="pic" />)}
              </div>

              <div className="signup-form-group">

                <label htmlFor="photo" className="profil-image">
                  <span className="choice-photo-label">Modifier Photo</span>
                  {/* si l'écran est inférieur à 1155px, alors on cache le logo d'image */}
                  {window.innerWidth > 1100 && (
                  <img className="choice-photo" src={imgchoice} alt="pic" />
                  )}
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
