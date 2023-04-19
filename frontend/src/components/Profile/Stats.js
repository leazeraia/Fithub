// import des dépendances
// la librairie chart.js pour le graphiques
// la librairie moment pour formater les dates
import Chart from 'chart.js/auto';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

// création du composant Stats
function Stats() {
  // states : chartDatas servira à stocker les données à afficher dans le graphique
  const [chartDatas, setChartDatas] = useState([]);
  const [level, setLevel] = useState('');
  const [inscriptionDate, setInscriptionDate] = useState('');

  // récupération de l'id de l'utilisateur
  const { userId } = useParams();

  // Récupère les données à afficher dans le graphique et dans le composant
  async function fetchGraphDatas() {
    // récupération des données de l'utilisateur
    const response = await fetch(`https://ynck-hng-server.eddi.cloud:8080/user/${userId}`);
    // conversion des données au format JSON
    const datas = await response.json();
    // on se servira de la variable user pour stocker les données à afficher dans le graphique
    const user = datas.userTotalActivityByDay;
    // récupération de l'xp
    const { xp } = datas.resultDataWithImage;
    // récupération et formatage de la date d'inscription
    const date = moment(datas.resultDataWithImage.created_at).format('DD/MM/YYYY');
    // calcul du niveau de l'utilisateur
    const levelfetched = (Math.sqrt(xp) * 0.08).toFixed(2);
    // stockage des données dans les states
    setLevel(levelfetched);
    setInscriptionDate(date);
    setChartDatas(user);
  }

  function refreshButton() {
    window.location.reload();
  }

  // Création d'une référence pour afficher le canvas dans le DOM
  const chartRef = React.createRef();

  // récupération des données à afficher dans le graphique au chargement du composant
  useEffect(() => {
    fetchGraphDatas();
  }, []);

  // initialisation du graphique lorsque les données sont chargées
  // useEffect prend deux paramètres : une fonction et un tableau de dépendances
  // le tableau de dépendances permet de définir quand la fonction doit être exécutée
  // ici le tableau contient la prop calories :
  // la fonction sera exécutée à chaque fois que la prop calories change
  useEffect(() => {
    // la classe Chart est fournie par la librairie chart.js
    // elle prend deux paramètres : un élément du DOM et un objet de configuration
    // l'objet de configuration contient les données à afficher, les options de style, etc.
    const chart = new Chart(chartRef.current, {
      // type de graphique
      type: 'bar',
      // données à afficher
      data: {
        labels: chartDatas.map((data) => data.date_assigned),
        // datasets contient un tableau d'objets
        // chaque objet représente un jeu de données à afficher : label, données, couleur, etc.
        datasets: [
          {
            label: ['Nombre de calories brûlées'],
            data: chartDatas.map((data) => data.total_calories_by_date),
            // yAxisID permet de spécifier sur quel axe afficher les données
            yAxisID: 'y',
            borderWidth: 1,
            backgroundColor: '#72a119',
          },
          {
            label: ['Durée de l\'effort'],
            data: chartDatas.map((data) => data.total_duration_by_date),
            yAxisID: 'y1',
            borderWidth: 1,
            backgroundColor: '#C0FFEE',
          },
        ],
      },
      // options de style
      options: {
        maintainAspectRatio: false, // permet de garder le ratio hauteur/largeur
        responsive: true, // rend le graphique redimensionnable
        scales: {
          // axe des ordonnées
          y: {
            beginAtZero: true,
            type: 'linear',
            position: 'left',
            // ticks permet de configurer les graduations de l'axe
            // la fonction callback permet de modifier le texte affiché
            ticks: {
              callback: function (value, index) {
                if (index === 0) {
                  return `${value} calories`;
                }
                return value;
              },
            },
          },
          // deuxième axe des ordonnées
          y1: {
            beginAtZero: true,
            type: 'linear',
            position: 'right',
            ticks: {
              // stepSize permet de définir l'espacement entre les graduations
              stepSize: 10,
              callback: function (value, index) {
                if (index === 0) {
                  return `${value} minutes`;
                }
                return value;
              },
            },
            // grid permet de configurer la grille de fond
            // drawOnChartArea permet de ne pas afficher la grille sur le graphique pour cet axe
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      },
    });
      // fonction retournée par useEffect exécutée à chaque fois que le composant est retiré du DOM
      // ici on détruit le graphique pour éviter les fuites mémoires
      // une fuite mémoire se produit quand un objet n'est plus utilisé mais n'est pas détruit
    return () => {
      chart.destroy();
    };
  }, [chartDatas]);

  return (
    <div className="stats">
      <i className="fa-solid fa-arrows-rotate stats__refresh" onClick={() => refreshButton()} />
      <h1 className="stats__title">Statistiques </h1>
      <p className="stats__infos">Inscrit depuis le : {inscriptionDate} </p>
      <p className="stats__infos">Niveau : {level} </p>
      {/** le canvas référence le graphique */}
      <div className="stats__chart">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
}

export default Stats;
