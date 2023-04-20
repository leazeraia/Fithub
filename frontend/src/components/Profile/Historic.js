// import de la feuille de style
import './styles.scss';

// import des hooks
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// import des propTypes
import PropTypes from 'prop-types';

// création du composant Historic
function Historic({ activity }) {
  // state activities pour stocker les activités de l'utilisateur
  const [activities, setActivities] = useState([]);

  // récupération de l'id de l'utilisateur
  const { userId } = useParams();

  // récupération des activités de l'utilisateur et stockage dans le state activities
  async function fetchActivities() {
    const response = await fetch(`https://fithub-backend-v2-production-87c0.up.railway.app/user/${userId}`);
    const datas = await response.json();
    const activitiesDatas = datas.resultDataWithImage.ActivitiesUsers;
    setActivities(activitiesDatas);
  }

  // suppression d'une activité
  async function deleteActivity(event, id) {
    // activité supprimée du DOM
    event.target.closest('.historic__activities__activity').remove();
    // suppression de l'activité de la base de données
    const oneActivity = activities.find((act) => act.id === id);
    await fetch(`https://fithub-backend-v2-production-87c0.up.railway.app/activity/user/${userId}/${oneActivity.ActivityUser.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
  }

  // récupération des activités de l'utilisateur au chargement du composant
  useEffect(() => {
    fetchActivities();
  }, []);

  // ajout d'une activité au state activities lorsque l'utilisateur en ajoute une
  // le tableau de dépendances contient la prop activity
  // qui sera modifiée à chaque fois que l'utilisateur
  // enregistre une activité dans le composant Record
  useEffect(() => {
    setActivities([...activities, activity]);
  }, [activity]);

  return (
    <div className="historic">
      <h1 className="historic__title">Historique des activités enregistrées</h1>
      <div className="historic__activities">
        {activities.map((act) => (
          <div className="historic__activities__activity" key={act.id}>
            <p className="historic__activities__activity__infos">
              J'ai fait : {act.label} pendant {act.ActivityUser.duration} minutes
            </p>
            <i className="fa-regular fa-circle-xmark cross" onClick={(event) => deleteActivity(event, act.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}

Historic.propTypes = {
  activity: PropTypes.arrayOf.isRequired,
};

export default Historic;
