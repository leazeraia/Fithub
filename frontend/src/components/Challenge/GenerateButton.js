// import de la feuille de style
import './styles.scss';
// import du hook useState
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

// création du composant GenerateButton
// il prend en props une fonction qui sera appelée au clic sur le bouton
// cette fonction est définie dans le composant Challenge
function GenerateButton() {
  // création d'un state challenge qui contiendra le défi généré
  // le tableau vide est la valeur par défaut du state
  // le premier élément du tableau est la valeur du state
  // le second élément du tableau est une fonction qui permet de modifier la valeur du state
  const [challenge, setChallenge] = useState({});
  const [isChallengeGenerated, setIsChallengeGenerated] = useState(false);
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState('no');

  const { userId } = useParams();

  async function fetchUser() {
    const response = await fetch(`https://ynck-hng-server.eddi.cloud:8080/user/${userId}`);
    const datas = await response.json();
    console.log('datas', datas);
    const challengeFetched = datas.resultDataWithImage.ChallengesUser;
    const resultFetched = challengeFetched[challengeFetched.length - 1].ChallengeUser.completed;
    const challengeDate = moment(challengeFetched[challengeFetched.length - 1].ChallengeUser.date_assigned).format('dddd Do MMMM');
    console.log('challengeDate', challengeDate);
    console.log('challengeFetched', challengeFetched);
    if (challengeDate === moment().format('dddd Do MMMM')) {
      console.log('resultFetched', resultFetched);
      setChallenge(challengeFetched[challengeFetched.length - 1]);
      setIsChallengeGenerated(true);
      setResult(resultFetched);
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

  // fonction qui génère un défi aléatoire
  // elle est appelée dans la fonction handleGenerateChallenge
  // la fonction handleGenerateChallenge est celle qui est appelée au clic sur le bouton
  const generateChallenge = async () => {
    // on assigne le challenge aléatoire au user dans le serveur
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

  const sendSuccess = async () => {
    const datas = {
      // todo : dynamiser pour que l'id du challenge corresponde à celui assigné au user
      challengeId: challenge.id,
    };
    const sendDatas = await fetch(`https://ynck-hng-server.eddi.cloud:8080/challenge/user/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(datas),
    });

    console.log(sendDatas);
    console.log('fonction sendSuccess');
    setSuccess(!success);
  };

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