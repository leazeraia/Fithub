// import des fichiers de style
import './styles.scss';

// import de la librairie PropTypes pour configurer et valider les props
import PropTypes from 'prop-types';

// import de useParams pour récupérer les paramètres de l'URL
import { useParams } from 'react-router-dom';

// import des composants Challenge et Stats
import Challenge from 'src/components/Challenge';
import Stats from './Stats';

// création du composant Profile
// ce composant reçoit une prop name
function Profile({ name }) {
  // récupération du paramètre id de l'URL
  const { id } = useParams();
  console.log(id); // affichage de l'id dans la console

  // affichage du composant
  return (
    <div className="profile">
      {/** la prop name est utilisée dans le composant entre les accolades */
      /** la variable name contient du code js correspondant aux proptypes */}
      <h1 className="profile__title">Profile de {name}</h1>
      <img className="profile__user-image" src="https://cdn.discordapp.com/attachments/1092419561556553770/1092419631295250472/box-g2d4630b48_1920.jpg" alt="user-logo" />
      <p className="profile__presentation">Bienvenue {name} ! Ici tu retrouveras tes défis quotidiens à découvrir sur le calendrier, et ton suivi de champion.ne. A toi de jouer !</p>
      <img className="profile__image" src="https://cdn.discordapp.com/attachments/1085935594250702978/1090929221460832297/man-g4a95936ad_1920.jpg" alt="challenge" />
      <Challenge />
      {/** appel du composant Stats avec ses 3 props : date, calories et level */}
      <Stats date="31/03/2023" calories={500} level={5} />

    </div>
  );
}

// validation des props : name est obligatoire et doit être une chaîne de caractères
Profile.propTypes = {
  name: PropTypes.string.isRequired,
};

// export du composant
// c'est un export par défaut : on pourra importer le composant Profile et l'appeler comme on veut
export default Profile;
