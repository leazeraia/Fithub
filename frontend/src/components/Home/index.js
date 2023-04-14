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

              <p> <span className="paraph-section"> Relever le défi du jour </span> <br /> Allez, c'est l'heure de relever le défis du jour et de montrer à votre corps et votre esprit de quoi vous êtes capables! </p>
            </div>

            <div className="box-section">
              <img src={check} alt="check" className="checking" />
              <p> <span className="paraph-section"> De suivre vos dépenses en calories </span> <br /> Chaque calorie que tu suis te rapproches un peu plus de tes objectifs, alors continue à suivre tes dépenses pour devenir la meilleure version de toi-même! </p>
            </div>
            <div className="box-section">
            <Link to="/signup" className='join-us'>
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
