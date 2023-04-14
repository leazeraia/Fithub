// import de la feuille de style
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles.scss';

import PropTypes from 'prop-types';

function Historic({ activity }) {
  const [activities, setActivities] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  const { userId } = useParams();

  async function fetchActivities() {
    const response = await fetch(`https://ynck-hng-server.eddi.cloud:8080/user/${userId}`);
    const datas = await response.json();
    const activitiesDatas = datas.resultDataWithImage.ActivitiesUsers;
    console.log('Activity in historic', activitiesDatas);
    // console.log('données récupérées dans fetchGraphDatas', user);
    setActivities(activitiesDatas);
  }

  async function deleteActivity(event, id) {
    event.target.closest('.historic__activities__activity').remove();
    // je veux récupérer une seule activité et son id
    // activities est un tableau d'objets
    // je veux récupérer l'objet qui a l'id de l'activité que je veux supprimer
    const oneActivity = activities.find((act) => act.id === id);
    const response = await fetch(`https://ynck-hng-server.eddi.cloud:8080/activity/user/${userId}/${oneActivity.ActivityUser.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    console.log('response', response);
    setIsDelete(true);
  }

  useEffect(() => {
    fetchActivities();
  }, []);

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
            <i className="fa-regular fa-circle-xmark cross" onClick={() => deleteActivity(event, act.id)} />
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
