// import de la feuille de style
import './styles.scss';
// import des hooks
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import de la librairie moment js
import moment from 'moment';

// création du composant Calendar
function Calendar() {
  // state dans lequel on stock si le challenge a été réalisé ou non
  const [challengeResults, setChallengeResults] = useState([]);
  // state dans lequel on stock le tableau des 7 derniers jours
  const [calendar, setCalendar] = useState([]);
  // state dans lequel on stock les challenges de l'utilisateur
  const [userChallenges, setUserChallenges] = useState([]);

  // récupération de l'id de l'utilisateur
  const { userId } = useParams();

  // fonction qui retourne un tableau contenant les 7 derniers jours
  async function getCalendar() {
    moment.locale('fr');
    // création d'un tableau vide
    const days = [];

    // on boucle sur les 7 derniers jours
    for (let i = 0; i < 7; i += 1) {
      // on ajoute le nom du jour au tableau
      days.push(moment().subtract(i, 'days').format('dddd Do MMMM'));
    }
    // on retourne le tableau
    setCalendar(days.reverse());
  }

  // récupération des challenges de l'utilisateur
  async function fetchUserChallenges() {
    const response = await fetch(`https://fithub-backend-v2-production-87c0.up.railway.app/user/${userId}`);
    const data = await response.json();
    const challenges = data.resultDataWithImage.ChallengesUser;
    const challengeList = challenges.map((challenge) => challenge.ChallengeUser);
    // mise à jour du state
    setUserChallenges(challengeList);
  }

  // récupération des challenges de l'utilisateur en fonction de la date
  async function getChallengeByDate() {
    // création d'un tableau vide
    const values = [];
    // boucle sur le tableau des 7 derniers jours
    for (let i = 0; i < calendar.length; i += 1) {
      // dans le tableau des challenges de l'utilisateur, pour chaque date,
      // on cherche si la date correspond à celle du jour du calendrier (en fonction de l'index)
      const dateFound = userChallenges.find((date) => moment(date.date_assigned).format('dddd Do MMMM') === calendar[i]);
      // si on trouve une date, on ajoute la valeur de la propriété completed
      // (qui renvoi yes ou no pour ce challenge) au tableau
      if (dateFound) {
        const { completed } = dateFound;
        values.push(completed);
      }
      // si on ne trouve pas de date, on ajoute forcément no au tableau
      else {
        values.push('no');
      }
    }

    // mise à jour du state avec le tableau des résultats
    setChallengeResults(values);
  }

  // renvoie l'icône à afficher en fonction du résultat du challenge
  function getIcon(challengeDone) {
    if (challengeDone === 'yes') {
      return <i className="fa-solid fa-circle-check" />;
    }
    return <i className="fa-solid fa-circle-xmark" />;
  }

  function refreshButton() {
    window.location.reload();
  }

  // au chargement du composant, on récupère le calendrier

  useEffect(() => {
    getCalendar();
  }, []);

  // quand le calendrier est mis à jour, on récupère les challenges de l'utilisateur
  useEffect(() => {
    fetchUserChallenges();
  }, [calendar]);

  // quand les challenges de l'utilisateur sont récupérés, on met à jour les dates et les résultats
  useEffect(() => {
    getChallengeByDate();
  }, [userChallenges]);

  return (
    <div className="calendar">
      <h1 className="calendar__title">Résultats des 7 derniers jours</h1>
      <i className="fa-solid fa-arrows-rotate stats__refresh" onClick={() => refreshButton()} />
      <div className="calendar__container">
        {/** pour chaque jour du tableau, on affiche le nom du jour et un icône */
        /** quand on map un tableau, il faut ajouter une clé unique à chaque élément
            ici on utilise la variable day qui contient le nom du jour */}
        {calendar.map((day, index) => (
          <div className="calendar__day" key={day}>
            <p className="calendar__day__name">{day}</p>
            {getIcon(challengeResults[index])}
          </div>
        ))}
      </div>
    </div>

  );
}

export default Calendar;
