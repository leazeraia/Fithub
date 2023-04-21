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

              <p> <span className="paraph-section"> Relever un défi par jour </span> <br /> Allez, c'est l'heure de relever le défi du jour et de montrer à votre corps et votre esprit de quoi vous êtes capables! </p>
            </div>

            <div className="box-section">
              <img src={check} alt="check" className="checking" />
              <p> <span className="paraph-section"> Suivre vos dépenses en calories </span> <br /> Chaque calorie dépensée vous rapproche un peu plus de vos objectifs ! Trackez vos activités pour devenir la meilleure version de vous-même ! </p>
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
