import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router';
// import Header from '../Header';
import check from '../../assets/images/check.png';
import './home.css';

class Home extends Component {
  render() {
    return (

      <div>
        <section className="home-section">

          <div className="item-section">
            <h1> Bienvenue sur FitHub ! </h1>
            <div className="box-section">
              <img src={check} alt="check" className="cheching" />

              <p> <span className="paraph-section"> Relever un défi par jour </span> <br /> La régularité, c'est plus facile en s'amusant : remportez des défis et montez en niveaux, la médaille d'or est à portée de clique ! </p>
            </div>

            <div className="box-section">
              <img src={check} alt="check" className="checking" />
              <p> <span className="paraph-section"> Suivre vos dépenses en calories </span> <br /> Vous pensez que planter des choux n'est pas du sport ? Enregistrez votre dernière session de jardinage, pour voir... </p>
            </div>
            <div className="box-section">
              <img src={check} alt="check" className="checking" />
              <p> <span className="paraph-section"> Rejoindre une communauté </span> <br /> Partagez vos statistiques et entraidez-vous pour viser la lune </p>
            </div>

            <div className="box-section">
              <Link to="/signup" className="join-us">
                <p> <span className="paraph-section"> Rejoignez-nous ! </span> </p>
              </Link>
            </div>

          </div>

        </section>
      </div>

    );
  }
}

export default Home;
