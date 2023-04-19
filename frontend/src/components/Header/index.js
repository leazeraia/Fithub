import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Cookie from 'js-cookie';
import logo from '../../assets/images/Logo_black.png';
import './styles.scss';

function Header({
  isAuthenticated, setIsAuthenticated, sessionId, setSessionId,
}) {
  // const Search = () => {
  const [isFormVisible, setisFormVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleFormVisibility = () => {
    setisFormVisible(!isFormVisible);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    if (!isAuthenticated) {
      try {
        const response = await fetch('https://ynck-hng-server.eddi.cloud:8080/user/session/login', {
        // headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          method: 'post',
          body: formData,
        });

        // on fait un objet pour tester à la place de la requête fetch
        // const response = {
        //   ok: true,
        // };

        if (!response.ok) {
          setisFormVisible(false);
          return setErrorMessage('Mot de passe ou nom d\'utilisateur incorrect');
        }
        const data = await response.json();
        setIsAuthenticated(true);
        setisFormVisible(false);
        Cookie.set('logged_in', 'yes');
        Cookie.set('uid', `${data.id}`);
        setSessionId(data.id);
        setErrorMessage('');
      }
      catch (error) {
        setErrorMessage('Une erreur est survenue');
      }
    }
    else {
      return setErrorMessage('Vous êtes déjà connecté');
    }
  };

  const disconnectButton = async () => {
    const response = await fetch('https://ynck-hng-server.eddi.cloud:8080/user/session/logout', {
      credentials: 'include',
    });
    // const response = {
    //   ok: true,
    // };
    if (!response.ok) {
      setErrorMessage('Une erreur est survenue');
    }
    Cookie.remove('logged_in');
    Cookie.remove('uid');
    setIsAuthenticated(false);
  };

  return (
    <nav className="header-nav">
      <div className="logo-nav">
        <Link to="/" className="link-logo-nav">
          <img src={logo} alt="logo FitHub" />
        </Link>
      </div>

      <div className="link-nav">
        <ul>

          {isAuthenticated && sessionId && (<li> <Link to={`/profiles/${sessionId}`}>Mon profil</Link></li>)} {/* à modifier pour que l'id soit dynamique */}

          <li> <Link to="/profiles">Membres</Link></li>

          {!isAuthenticated ? <li> <Link to="/signup"> S'inscrire</Link></li> : ''}

          <li className="login-nav">
            <p> {isAuthenticated ? 'Déconnexion' : 'Se connecter'} </p>
            {!isAuthenticated ? <i className="fa-solid fa-circle-plus" onClick={toggleFormVisibility} /> : <i className="fa-solid fa-circle-minus" onClick={disconnectButton} /> }

            {isFormVisible && (
            <form onSubmit={handleSubmit} className="form-login">
              <div className="form-group">
                <div>
                  <label htmlFor="email">E-mail</label>
                </div>
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} name="email" id="email" />
              </div>

              <div className="form-group form-group-password">
                <div>
                  <label htmlFor="password">Mot de Passe</label>
                </div>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} name="password" id="password" />
              </div>
              <Link to="/reset-password" className="passwordforget">
                Mot de passe oublié
              </Link>
              <div className="btn-submit">
                <button type="submit"> Connecter</button>
              </div>

            </form>
            )}

          </li>
        </ul>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>

    </nav>
  );
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
  sessionId: PropTypes.number.isRequired,
  setSessionId: PropTypes.func.isRequired,
};

export default Header;
