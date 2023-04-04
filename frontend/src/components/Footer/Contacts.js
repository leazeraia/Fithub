// import de la feuille de style
import './styles.scss';

// import du hook useState de react
import {useState} from 'react';

// création du composant Contacts
// il s'agit d'un formulaire de contact
function Contacts() {

// création des variables d'état
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [message, setMessage] = useState('');

// création de fonction handleSubmit 
// elle permet de récupérer les valeurs des inputs au moment de la soumission du formulaire
const handleSubmit = (evt) => {
  evt.preventDefault();
  alert(`Name : ${name} Email : ${email} Message : ${message}`)
}

// création de trois fonctions handleChange
const handleChangeName = (evt) => {
  setName(evt.target.value);
}

const handleChangeEmail = (evt) => {
  setEmail(evt.target.value);
}

const handleChangeMessage = (evt) => {
  setMessage(evt.target.value);
}

  return (
    <div className="contacts">
      <h1 className="contacts__title">Contacts</h1>
      <p className="contacts__text">Vous pouvez nous contacter à l'adresse suivante :
        <a className="contacts__link" href="mailto: fithub@sport.fr"> fithub@sport.fr </a>
      </p>
      <p className="contacts__text">Vous pouvez également nous contacter par téléphone au 01 23 45 67 89</p>
      <form className="contacts__form" onSubmit={handleSubmit}>
        <label className="contacts__label" htmlFor="name">Nom</label>
        <input className="contacts__input" type="text" id="name" name="name" onChange={handleChangeName}/>
        <label className="contacts__label" htmlFor="email">Email</label>
        <input className="contacts__input" type="email" id="email" name="email" onChange={handleChangeEmail} />
        <label className="contacts__label" htmlFor="message">Message</label>
        {/** la balise textarea permet de créer une zone de texte afin d'écrire son message. On peut régler sa taille directement sur la page */}
        <textarea className="contacts__textarea" id="message" name="message" onChange={handleChangeMessage} />
        <button className="contacts__button" type="submit">Envoyer</button>
      </form>
    </div>
  );
}

// export du composant Contacts
export default Contacts;
