// import de la feuille de style
import './styles.scss';

// import du hook useState
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import de la librairie moment js
import moment from 'moment';

// création du composant Calendar
function Calendar() {
  // création d'un state dans lequel on stock si le challenge a été réalisé ou non
  const [challengeResults, setChallengeResults] = useState([]);
  // création d'un state dans lequel on stock le tableau des 7 derniers jours
  const [calendar, setCalendar] = useState([]);
  const [userChallenges, setUserChallenges] = useState([]);

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

  async function fetchUserChallenges() {
    const response = await fetch(`https://ynck-hng-server.eddi.cloud:8080/user/${userId}`);
    const data = await response.json();

    const challenges = data.resultDataWithImage.ChallengesUser;
    const challengeList = challenges.map((challenge) => challenge.ChallengeUser);
    // const result = challenges.map((challenge) => challenge.ChallengeUser.completed);
    // console.log(moment(challenges[0].ChallengeUser.date_assigned).format('dddd Do MMMM'));
    // console.log('result', result);
    // setChallengeResults(result);
    setUserChallenges(challengeList);
  }

  // fonction qui renvoie l'icône à afficher en fonction du résultat du challenge
  function getIcon(challengeDone) {
    if (challengeDone === 'yes') {
      return <i className="fa-solid fa-circle-check" />;
    }
    return <i className="fa-solid fa-circle-xmark" />;
  }

  async function getChallengeByDate() {
    // const userChallengeDates = userChallenges.map((challenge) =>
    // moment(challenge.date_assigned).format('dddd Do MMMM'));
    // map sur les dates du calendrier. Dans le map on incorpore les challenges

    const values = [];
    for (let i = 0; i < calendar.length; i += 1) {
      const dateFound = userChallenges.find((date) => moment(date.date_assigned).format('dddd Do MMMM') === calendar[i]);
      if (dateFound) {
        const { completed } = dateFound;

        values.push(completed);
      }
      else {
        values.push('no');
      }
    }
    await setChallengeResults(values);
  }

  // si la date ld'assignation du challenge est égale à celle du jour du calendrier,
  // alors on trouvera une propriété completed
  // dans ce cas on trouvera un yes ou un no et on affiche l'icone correspondante
  // si on ne trouve pas de date d'assignation, on affiche une croix par défaut

  // au chargement du composant, on récupère les résultats
  useEffect(() => {
    getCalendar();
  }, []);

  useEffect(() => {
    fetchUserChallenges();
  }, [calendar]);

  useEffect(() => {
    getChallengeByDate();
  }, [userChallenges]);

  return (
    <div className="calendar">
      <h1 className="calendar__title">Historique des 7 derniers jours</h1>
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
