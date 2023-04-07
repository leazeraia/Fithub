// import du fichier de style
import './styles.scss';
// import de la balise Link de react-router-dom
import { Link, useNavigate } from 'react-router-dom';

// création du composant Footer

function Footer() {
  return (
    <footer className="footer">
      <Link to="/contacts" className="footer__link">Contacts</Link>
      <Link to="/mentionslegales" className="footer__link">Mentions légales</Link>
      <p className="footer__text">© 2023 - Tous droits réservés</p>
    </footer>
  );
}

// export du composant Footer
export default Footer;