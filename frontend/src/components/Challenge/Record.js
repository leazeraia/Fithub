/* eslint-disable jsx-a11y/label-has-associated-control */
// import de la feuille de style
import './styles.scss';
// import des hooks
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// création du composant Record
function Record() {
  // states
  const [duration, setDuration] = useState('');
  const [allCategories, setAllCategories] = useState('');
  const [allActivities, setAllActivities] = useState('');
  const [activity, setActivity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [userActivities, setuserActivities] = useState([]);
  // state qui permet d'initier un compteur
  const [counter, setCounter] = useState(0);

  /// récupéreration l'id d'un user
  const { userId } = useParams();

  // récupération des catégories et des activités qui y sont associées
  async function fetchAllCategories() {
    const categories = await fetch('https://fithub-backend-v2-production-87c0.up.railway.app/category-activity');
    const data = await categories.json();
    setAllCategories(data);
  }

  // récupèération des activités de la catégorie sélectionnée
  async function fetchActivitiesByCategory(categoryId) {
    // pour chaque catégorie, on vérifie si l'id de la catégorie
    // correspond à l'id de la catégorie sélectionnée dans le select, passé en paramètre
    const response = await allCategories.find((cat) => cat.id === Number(categoryId));
    // mise à jour du state allActivities avec les activités de la catégorie sélectionnée
    // le ? permet de vérifier si la catégorie existe
    setAllActivities(response?.ActivitiesCategory);
  }

  // fonction appelée au clic sur le bouton Enregistrer
  const handleSubmit = async (event) => {
    // on empêche le comportement par défaut du formulaire
    event.preventDefault();

    if (activity === '' || duration === 0) {
      setErrorMessage('Veuillez remplir tous les champs');
      return;
    }

    if (duration < 0 || duration > 180) {
      setErrorMessage('Veuillez saisir une durée entre 0 et 180 minutes');
      return;
    }
    // création d'un objet qui contient les données à envoyer au serveur
    const datas = {
      user_id: userId,
      activity_id: activity,
      duration: duration,
    };
    // envoie des données au serveur
    const sendDatas = await fetch('https://fithub-backend-v2-production-87c0.up.railway.app/activity/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(datas),
    });
    // récupération des données renvoyées par le serveur
    const activityFetched = await sendDatas.json();
    // avec le spread operator, on récupère le contenu du tableau activities
    // et on ajoute le nouvel élément à la fin du tableau
    // cet élément contient les activités renvoyées par le serveur
    const newList = [...userActivities, {
      id: counter,
      label: activityFetched.label,
      calories: activityFetched.calories,
      ActivityUser: { duration: activityFetched.duration },
    }];

    setuserActivities(newList);
    setCounter(counter + 1);
    // réinitialisation de la valeur du champ de saisie
    setDuration('');
  };

  // GESTION DE L'HISTORIQUE DES ACTIVITES

  // récupération des activités d'un user
  async function fetchActivities() {
    const response = await fetch(`https://fithub-backend-v2-production-87c0.up.railway.app/user/${userId}`);
    const data = await response.json();
    const activitiesDatas = data.resultDataWithImage.ActivitiesUsers;
    setuserActivities(activitiesDatas);
  }

  // suppression d'une activité
  async function deleteActivity(event, id) {
    event.target.closest('.historic__activities__activity').remove();
    // Récupération d'une activité et son id en fonction de l'id de l'activité
    // passé en paramètre, que je souhaite supprimer
    const oneActivity = userActivities.find((act) => act.id === id);
    await fetch(`https://fithub-backend-v2-production-87c0.up.railway.app/activity/user/${userId}/${oneActivity.ActivityUser.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
  }

  // récupération des catégories et des activités de l'utilisateur au chargement de la page
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
                fetchActivitiesByCategory(event.target.value);
                setAllActivities([]);
              }}
            >

              { /* allCategories.map((cat) => (<option>{cat.label}</option>)) */}
              <option value=""> - Sélectionner -</option>
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
              <option value="">- Sélectionner -</option>
              {allActivities ? allActivities.map((act) => (<option key={act.id} value={act.id}>{act.label}</option>)) : ' '}
            </select>
          </div>
          <div className="record__form__container">
            <label className="record__form__container__label" htmlFor="duration">Durée :</label>
            <input
              type="number"
              id="duration"
              min={1}
              max={180}
              onChange={(event) => setDuration(event.target.value)}
              placeholder="en minutes"
              required
            />
          </div>
          {errorMessage && <p className="record__form__error">{errorMessage}</p>}
          <button className="record__form__button" type="submit">Enregistrer</button>
        </form>

      </div>
      <div className="historic">
        <h1 className="historic__title">Historique des activités enregistrées</h1>
        <div className="historic__activities">
          {userActivities.map((act) => (

            <div className="historic__activities__activity" key={act.id}>
              <p className="historic__activities__activity__infos">
                J'ai fait {act.label} pendant {act.ActivityUser.duration} minutes
              </p>
              <i className="fa-regular fa-circle-xmark cross" onClick={(event) => deleteActivity(event, act.id)} />
            </div>

          ))}
        </div>
      </div>

    </>
  );
}

export default Record;
