import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Cookie from 'js-cookie';
import logo from '../../assets/images/Logo_black.png';
import './styles.scss';

function Header({
  isAuthenticated, setIsAuthenticated, sessionId, setSessionId,
}) {
  const [isFormVisible, setisFormVisible] = useState(false);
  const [isNavVisible, setisNavVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleFormVisibility = () => {
    setisFormVisible(!isFormVisible);
  };

  const toggleNavVisibility = () => {
    setisNavVisible(!isNavVisible);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    if (!isAuthenticated) {
      try {
        const response = await fetch('https://fithub-backend-v2-production-87c0.up.railway.app/user/session/login', {
          credentials: 'include',
          method: 'post',
          body: formData,
        });

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
    const response = await fetch('https://fithub-backend-v2-production-87c0.up.railway.app/user/session/logout', {
      credentials: 'include',
    });
    if (!response.ok) {
      setErrorMessage('Une erreur est survenue');
    }
    Cookie.remove('logged_in');
    Cookie.remove('uid');
    setIsAuthenticated(false);
    window.location.reload();
  };

  return (
    <nav className="header-nav">
      <div className="logo-nav">
        <Link to="/" className="link-logo-nav">
          <img src={logo} className="img-logo" alt="logo FitHub" />
        </Link>
      </div>
      <i className={isNavVisible ? '' : 'fa-solid fa-bars burger '} onClick={toggleNavVisibility} />
      {isNavVisible
        ? (
          <div className="link-nav-responsive">

            <ul className="form-responsive ">
              <i className="fa-solid fa-circle-xmark close-button" onClick={toggleNavVisibility} />

              {isAuthenticated && sessionId && (<li> <Link to={`/profiles/${sessionId}`}>Mon profil</Link></li>)} {/* à modifier pour que l'id soit dynamique */}

              <li className="link-nav-item"> <Link to="/profiles">Membres</Link></li>

              {!isAuthenticated ? <li className="link-nav-item"> <Link to="/signup"> S'inscrire</Link></li> : ''}

              <li className="login-nav">
                <p className="link-nav-item"> {isAuthenticated ? 'Déconnexion' : 'Se connecter'} </p>
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
                    <input type="password" onChange={(event) => setPassword(event.target.value)} name="password" id="password" />
                  </div>
                  <div className="btn-submit">
                    <button type="submit"> Connecter</button>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                  </div>

                </form>
                )}

              </li>
            </ul>
          </div>

        ) : '' }

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
                <input type="password" onChange={(event) => setPassword(event.target.value)} name="password" id="password" />
              </div>
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
