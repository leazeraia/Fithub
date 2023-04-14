// import des dépendances
import Chart from 'chart.js/auto';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

// création du composant Stats
// ce composant reçoit 3 props : date, calories et level
function Stats() {
  const [chartDatas, setChartDatas] = useState([]);
  const [level, setLevel] = useState('');
  const [inscriptionDate, setInscriptionDate] = useState('');
  const { userId } = useParams();

  async function fetchGraphDatas() {
    const response = await fetch(`https://ynck-hng-server.eddi.cloud:8080/user/${userId}`);
    const datas = await response.json();

    const user = datas.userTotalActivityByDay;
    const { xp } = datas.resultDataWithImage;
    const date = moment(datas.resultDataWithImage.created_at).format('DD/MM/YYYY');
    const levelfetched = (Math.sqrt(xp) * 0.08).toFixed(2);
    setLevel(levelfetched);
    setInscriptionDate(date);
    // const activities = datas.resultDataWithImage.ActivitiesUsers;
    // const durationByActivity = activities.map((activity) => activity.ActivityUser.duration);
    // console.log('durations', durationByActivity);
    // console.log('données récupérées dans fetchGraphDatas', user);
    setChartDatas(user);
  }

  // Création d'une référence pour le canvas
  const chartRef = React.createRef();
  // console.log('données récupérées dans chartDatas', chartDatas);
  // initialiser le graphique
  // useEffect prend deux paramètres : une fonction et un tableau de dépendances
  // le tableau de dépendances permet de définir quand la fonction doit être exécutée
  // ici le tableau contient la prop calories :
  // la fonction sera exécutée à chaque fois que la prop calories change
  React.useEffect(() => {
    // création du graphique
    // la classe Chart est fournie par la librairie chart.js
    // elle prend deux paramètres : un élément DOM et un objet de configuration
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
            // yAxisID permet de spécifier sur quel axe afficher les données
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
          y: {
            // min: 0, // valeur minimale de l'axe des ordonnées
            // max: 1000, // valeur maximale de l'axe des ordonnées
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

          y1: {

            // min: 0, // valeur minimale de l'axe des ordonnées
            // max: 120, // valeur maximale de l'axe des ordonnées

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
            // drawOnChartArea permet de ne pas afficher la grille sur le graphique
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      },
    });
    // la fonction retournée par useEffect exécutée à chaque fois que le composant est retiré du DOM
    // ici on détruit le graphique pour éviter les fuites mémoires
    // une fuite mémoire se produit quand un objet n'est plus utilisé mais n'est pas détruit
    return () => {
      chart.destroy();
    };
  }, [chartDatas]);

  useEffect(() => {
    fetchGraphDatas();
  }, []);

  return (
    <div className="stats">
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