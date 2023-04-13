// import de la feuille de style
import './styles.scss';
// import du hook useState
import { useState, useEffect } from 'react';
import { json, useParams } from 'react-router-dom';
import Historic from '../Profile/Historic';

// création du composant Record
function Record() {
  // création de trois states qui contiendront les valeurs des champs du formulaire
  const [category, setCategory] = useState('');
  const [duration, setDuration] = useState('');
  const [allCategories, setAllCategories] = useState('');
  const [allActivities, setAllActivities] = useState('');
  const [activity, setActivity] = useState('');
  const [newActivity, setNewActivity] = useState([]);
  const [activities, setActivities] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  // je veux envoyer les données au serveur
  /// je dois récupérer l'id d'un user
  const { userId } = useParams();

  const datas = {
    user_id: userId,
    activity_id: activity,
    duration: duration,
  };

  // la fonction handleSubmit est appelée au clic sur le bouton Enregistrer
  const handleSubmit = async (event) => {
    // on empêche le comportement par défaut du formulaire
    event.preventDefault();
    // on affiche les valeurs des champs dans la console
    // console.log(`Activité enregistrée : activité ${activity} durée ${duration} userId ${userId}`);
    // envoie des données au serveur ou à un autre composant
    const sendDatas = await fetch('https://ynck-hng-server.eddi.cloud:8080/activity/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(datas),
    });
    const activityFetched = await sendDatas.json();
    setNewActivity(activityFetched);
    const newList = [...activities, {
      id: 100000, label: activityFetched.label, calories: activityFetched.calories, ActivityUser: { duration: activityFetched.duration },
    }];
    setActivities(newList);
    // réinitialisation les valeurs des champs
    setCategory('');
    setDuration('');
  };

  async function fetchAllCategories() {
    // // si tu passes par une variable
    // const categories = await fetch('https://ynck-hng-server.eddi.cloud:8080/category-activity');
    // // console.log(await categories.json());
    // allCategories = await categories.json();
    // return allCategories;

    // si tu passes par un state
    const categories = await fetch('https://ynck-hng-server.eddi.cloud:8080/category-activity');
    const data = await categories.json();
    // console.log(data);
    setAllCategories(data);
  }

  // méthode qui récupère les activités de la catégorie sélectionnée
  async function fetchActivitiesByCategory(categoryId) {
    // console.log(`categoryId${categoryId}`);
    const response = await allCategories.find((cat) => cat.id === Number(categoryId));
    // console.log(response.ActivitiesCategory);
    setAllActivities(response.ActivitiesCategory);
    // return response.ActivitiesCategory;
  }

  // HISTORIC COMPONENT

  // const { userId } = useParams();

  async function fetchActivities() {
    const response = await fetch(`https://ynck-hng-server.eddi.cloud:8080/user/${userId}`);
    const data = await response.json();
    const activitiesDatas = data.resultDataWithImage.ActivitiesUsers;
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
    fetchAllCategories();
    fetchActivities();
  }, []);

  return (
    <>
      <div className="record">

        <h2 className="record__title">Enregistrement de l'activité</h2>
        {/** à la somission du formulaire, la fonction handleSubmit est executée */}
        <form className="record__form" onSubmit={handleSubmit}>

          <div className="record__form__container">
            <label className="record__form__container__label" htmlFor="category">Catégorie :</label>
            <select
              id="category"
              onChange={(event) => {
              // console.log(`catégorie du onChange : ${event.target.value}`);
                fetchActivitiesByCategory(event.target.value);
              }}
            >

              { /* allCategories.map((cat) => (<option>{cat.label}</option>)) */}
              {
              allCategories ? allCategories.map((cat) => (<option key={cat.id} value={cat.id}>{cat.label}</option>)) : ' '
            }
            </select>
          </div>
          <div className="record__form__container">
            <label className="record__form__container__label" htmlFor="activity">Activité :</label>
            <select
              id="activity"
              onChange={(event) => {
                setActivity(event.target.value);
              }}
            >
              {allActivities ? allActivities.map((act) => (<option key={act.id} value={act.id}>{act.label}</option>)) : ' '}
            </select>
          </div>
          <div className="record__form__container">
            <label className="record__form__container__label" htmlFor="duration">Durée :</label>
            <input
              type="number"
              id="duration"
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              placeholder="en minutes"
              required
            />
          </div>
          <button className="record__form__button" type="submit">Enregistrer</button>
        </form>

      </div>
      {/* <Historic activity={newActivity} /> */}
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

    </>
  );
}

export default Record;
