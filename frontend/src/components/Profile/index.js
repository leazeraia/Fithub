// import du fichiers de style
import './styles.scss';
// import de l'avatar par défaut
import avatar from 'src/assets/images/avatar.jpg';

// import de la librairie PropTypes pour configurer et valider les props
import PropTypes from 'prop-types';

// import des hooks
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

// import des composants
import Challenge from 'src/components/Challenge';
import { useEffect, useState } from 'react';
import Stats from './Stats';
import DeleteUserButton from './DeleteUserButton';
import SettingsButton from './SettingsButton';

// Composant Profile : il reçoit des props
function Profile({
  setIsAuthenticated, isAuthenticated, sessionId,
}) {
  // récupération du paramètre id de l'URL
  const { userId } = useParams();

  // states pour stocker les données de l'utilisateur
  const [image, setImage] = useState('');
  const [name, setname] = useState('');

  // Récupère les données de l'utilisateur
  async function fetchUser() {
    // requête fetch pour récupérer les données de l'utilisateur
    const response = await fetch(`https://ynck-hng-server.eddi.cloud:8080/user/${userId}`);
    // conversion de la réponse en json
    const datas = await response.json();
    // récupération des données
    const imagefetched = datas.resultDataWithImage.image_path;
    const namefetched = datas.resultDataWithImage.nickname;
    // mise à jour des states
    setname(namefetched);
    setImage(imagefetched);
  }

  Profile.defaultProps = {
    setIsAuthenticated: () => {}, // valeur par défaut passée à setIsAuthenticated
  };

  // appel de la fonction fetchUser au chargement du composant
  useEffect(() => {
    fetchUser();
  });

  // affichage du composant
  return (
    <div className="profile">
      {/** les variables entre accolades contiennent du code js */}
      <h1 className="profile__title">Profil de {name}</h1>
      {/** l'image sera soit celle de l'utilisateur s'il en a une,
       * sinon on affiche l'avatar par défaut */}
      <img className="profile__user-image" src={image ? `https://ynck-hng-server.eddi.cloud:8080/${image}` : avatar} alt="user-logo" />
      {/** si l'utilisateur est connecté et que son id est le même que celui de l'url, on affiche :
       *  le bouton de suppression de compte
       *  le bouton de paramètres
       *  le texte de présentation
       *  le composant Challenge
      */}
      {/** Le composant Stats est visible par tous les utilisateurs */}
      {isAuthenticated && Number(userId) === sessionId && <SettingsButton />}
      {isAuthenticated && Number(userId) === sessionId ? <p className="profile__presentation">Bonjour {name} ! Ici tu retrouveras tes défis quotidiens, un tracker d'activités et un suivi pour ne pas perdre le fil !</p> : '' }
      {isAuthenticated && Number(userId) === sessionId && <Challenge />}
      {/** composant Stats */}
      <Stats />
      {isAuthenticated && Number(userId) === sessionId
      && (
      <DeleteUserButton
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      )}
    </div>
  );
}

// validation des props : on a un booléen, un nombre et une fonction
Profile.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  sessionId: PropTypes.number.isRequired,
  setIsAuthenticated: PropTypes.func,
};

// export du composant
// c'est un export par défaut : on pourra importer le composant Profile et l'appeler comme on veut
export default Profile;