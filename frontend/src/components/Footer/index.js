// import du fichier de style
import './styles.scss';
// import de la balise Link de react-router-dom
import { Link, useNavigate } from 'react-router-dom';

// création du composant Footer
const Footer = () => {
  
  // le hook useHistory permet de rediriger l'utilisateur vers une autre page
  const navigate = useNavigate();

  // création de la fonction handleClick
  // elle permet de rediriger l'utilisateur vers la page Contacts
  const handleContactsClick = () => {
    navigate.push('/contacts');
  };

  return(
  // création de la balise footer, des liens et du paragraphe
  <footer className="footer">
    <Link to='/contacts' className="footer__link" onClick={handleContactsClick}>Contacts</Link>
    <Link to='/mentionslegales' className="footer__link">Mentions légales</Link>
    <p className="footer__text">© 2023 - Tous droits réservés</p>
  </footer>
);


  };

// export du composant Footer
export default Footer;
