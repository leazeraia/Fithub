// import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import img404 from 'src/assets/images/img404.jpg';
import './styles.scss';

function NotFound() {
  return (
    <div className="container-redirection">
      <div className="redirection-title">
        <h1 className="error-status-title">404 </h1>
      </div>

      <div className="redirection-para">
        <p>Oups ! -Page not found</p>
        <br />
        <p> La page que vous recherchez semble introuvable</p>
      </div>

      <Link to="/" className="redirection-link">On retourne à la Page d'accueil ? </Link>

    </div>

  );
}

export default NotFound;
