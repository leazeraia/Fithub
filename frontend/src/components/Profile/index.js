// import des fichiers de style
import './styles.scss';
import avatar from 'src/assets/images/avatar.jpg';

// import de la librairie PropTypes pour configurer et valider les props
import PropTypes from 'prop-types';

// import de useParams pour récupérer les paramètres de l'URL
import { useParams } from 'react-router-dom';

// import des composants Challenge et Stats
import Challenge from 'src/components/Challenge';
import { useEffect, useState } from 'react';
import Stats from './Stats';
import DeleteUserButton from './DeleteUserButton';
import SettingsButton from './SettingsButton';
// import Historic from './Historic';

// création Du composant Profile
// ce composant reçoit une prop name
function Profile({ setIsAuthenticated, isAuthenticated, sessionId }) {
  // récupération du paramètre id de l'URL
  const { userId } = useParams();

  const [image, setImage] = useState('');
  const [name, setname] = useState('');

  async function fetchUser() {
    const response = await fetch(`https://ynck-hng-server.eddi.cloud:8080/user/${userId}`);
    const datas = await response.json();
    const imagefetched = datas.resultDataWithImage.dataURI;
    const namefetched = datas.resultDataWithImage.nickname;
    setname(namefetched);
    setImage(imagefetched);
  }

  useEffect(() => {
    fetchUser();
  });

  // affichage du composant
  return (
    <div className="profile">
      {/** la prop name est utilisée dans le composant entre les accolades */
      /** la variable name contient du code js correspondant aux proptypes */}
      <h1 className="profile__title">Profil de {name}</h1>
      <img className="profile__user-image" src={image || avatar} alt="user-logo" />
      {isAuthenticated && Number(userId) === sessionId && <SettingsButton />}
      {isAuthenticated && Number(userId) === sessionId ? <p className="profile__presentation">Bonjour {name} ! Ici tu retrouveras tes défis quotidiens, un tracker d'activités et un suivi pour ne pas perdre le fil !</p> : '' }
      {isAuthenticated && Number(userId) === sessionId && <Challenge />}
      {/** appel du composant Stats avec ses 3 props : date, calories et level */}
      <Stats />
      {/** * ici on a un système d'historique qui affiche l'historique des activités de l'utilisateur, sa durée, son nom, la catégorie et la date */}
      {/* <Historic /> */}
      {isAuthenticated && Number(userId) === sessionId && <DeleteUserButton isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}
    </div>
  );
}

// validation des props : name est obligatoire et doit être une chaîne de caractères
Profile.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  sessionId: PropTypes.number.isRequired,
  setIsAuthenticated: PropTypes.func,
};

// export du composant
// c'est un export par défaut : on pourra importer le composant Profile et l'appeler comme on veut
export default Profile;
