import './styles.scss';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';

import propTypes from 'prop-types';

function DeleteUserButton({ isAuthenticated, setIsAuthenticated }) {
  const [isDeleteRequired, setIsDeleteRequired] = useState(false);

  const { userId } = useParams();
  const navigate = useNavigate();

  function handleRequireDelete() {
    setIsDeleteRequired(true);
  }

  async function deleteUser() {
    if (isAuthenticated) {
      const datas = {
        userId: userId,
      };
      const sendDatas = await fetch(`https://ynck-hng-server.eddi.cloud:8080/user/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const response = await sendDatas.json();
      console.log('response', response);
      Cookie.remove('logged_in');
      Cookie.remove('uid');
      setIsAuthenticated(false);
      navigate('/');
    }

    console.log('pas authentifié');
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
