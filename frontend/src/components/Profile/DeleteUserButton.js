// import de la feuille de style
import './styles.scss';

// import des hooks
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import de la librairie js-cookie et des propTypes
import Cookie from 'js-cookie';
import propTypes from 'prop-types';

// création du composant DeleteUserButton
// on lui passe en props isAuthenticated et setIsAuthenticated
// car le bouton ne doit être affiché que si l'utilisateur est connecté
// et qu'il ne sera plus authentifié après la suppression de son compte
function DeleteUserButton({ isAuthenticated, setIsAuthenticated }) {
  // state pour afficher ou non le bouton de suppression
  const [isDeleteRequired, setIsDeleteRequired] = useState(false);
  // récupération de l'id de l'utilisateur
  const { userId } = useParams();
  // récupération de la fonction navigate du hook useNavigate
  const navigate = useNavigate();
  // cache le bouton de suppression lorsque l'utilisateur clique dessus
  // ca nous permettra de lui demander de confirmer la suppression
  function handleRequireDelete() {
    setIsDeleteRequired(true);
  }
  // suppression de l'utilisateur de la base de données
  async function deleteUser() {
    if (isAuthenticated) {
      await fetch(`https://ynck-hng-server.eddi.cloud:8080/user/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      Cookie.remove('logged_in');
      Cookie.remove('uid');
      setIsAuthenticated(false);
      navigate('/');
    }

    navigate('/');
  }

  return (
    <div className="deleteUserButton">
      {!isDeleteRequired ? <button className="deleteUserButton__button" type="button" onClick={handleRequireDelete}>Supprimer mon compte</button> : <><p className="deleteUserButton__warning">Attention, cette action est irréversible !</p> <i className="fa-solid fa-check" onClick={deleteUser} /></>}

    </div>
  );
}

DeleteUserButton.propTypes = {
  isAuthenticated: propTypes.bool.isRequired,
  setIsAuthenticated: propTypes.func.isRequired,
};

export default DeleteUserButton;
