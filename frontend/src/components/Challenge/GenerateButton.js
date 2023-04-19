// import de la feuille de style
import './styles.scss';
// import des hooks
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import de la librairie moment pour la gestion des dates
import moment from 'moment';

// création du composant GenerateButton
function GenerateButton() {
  // création des states challenge qui contiendra le défi généré
  // le tableau vide est la valeur par défaut du state
  // le premier élément du tableau est la valeur du state
  // le second élément du tableau est une fonction qui permet de modifier la valeur du state
  const [challenge, setChallenge] = useState({});
  const [isChallengeGenerated, setIsChallengeGenerated] = useState(false);
  const [success, setSuccess] = useState(false);

  // récupération de l'id de l'utilisateur
  const { userId } = useParams();

  // récupère le défi généré par le serveur et met à jour le state challenge
  // la génération du challenge a lieu côté serveur
  const generateChallenge = async () => {
    const datas = {
      userId: userId,
    };
    const sendDatas = await fetch('https://ynck-hng-server.eddi.cloud:8080/challenge/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(datas),
    });

    const response = await sendDatas.json();
    setChallenge(response);
    setIsChallengeGenerated(true);
  };

  // récupération des données de l'utilisateur
  // ca permet de vérifier si le défi du jour a déjà été généré
  // et si oui, de récupérer le résultat du défi
  async function fetchUser() {
    const response = await fetch(`https://ynck-hng-server.eddi.cloud:8080/user/${userId}`);
    const datas = await response.json();
    const challengeFetched = datas.resultDataWithImage.ChallengesUser;
    // récupère le résultat du dernier défi généré
    const resultFetched = challengeFetched[0].ChallengeUser.completed;
    // récupère et formate la date du dernier défi généré
    const challengeDate = moment(challengeFetched[0].ChallengeUser.date_assigned).format('dddd Do MMMM');
    // vérifie si le défi du jour a déjà été généré et mise à jour des states
    if (challengeDate === moment().format('dddd Do MMMM')) {
      setChallenge(challengeFetched[0]);
      setIsChallengeGenerated(true);
      switch (resultFetched) {
        case 'yes':
          setSuccess(true);
          break;
        case 'no':
          setSuccess(false);
          break;
        default:
          break;
      }
    }
  }

  // envoie le résultat du défi au serveur : yes ou no
  // mise à jour du state success pour afficher le bouton de modification du défi
  const sendSuccess = async () => {
    const datas = {
      challengeId: challenge.id,
    };
    await fetch(`https://ynck-hng-server.eddi.cloud:8080/challenge/user/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(datas),
    });

    setSuccess(!success);
  };

  // récupération des données de l'utilisateur au chargement de la page
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="generateButton">
      {isChallengeGenerated
        ? (
          <div className={success ? 'generateButton__hidden' : 'generateButton__challengeGenerated'}>
            <p className="generateButton__challengeGenerated">Ton défis aujourd'hui : {challenge.label} !</p>
            <i className="fa-solid fa-check" onClick={sendSuccess} />
          </div>
        )
        : <button className="generateButton__button" type="button" onClick={generateChallenge}>Générer mon défis quotidien !</button>}

      {success ? (
        <><p className="success__message">Bravo, tu as réussi le challenge !</p>
          <i className="fa-solid fa-pencil" onClick={sendSuccess} />
        </>
      )
        : null}

    </div>

  );
}

export default GenerateButton;
