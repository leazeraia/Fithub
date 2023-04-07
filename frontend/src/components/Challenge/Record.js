// import de la feuille de style
import './styles.scss';
// import du hook useState
import { useState } from 'react';

// création du composant Record
function Record() {
  // création de trois states qui contiendront les valeurs des champs du formulaire
  const [category, setCategory] = useState('');
  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState('');

  // la fonction handleSubmit est appelée au clic sur le bouton Enregistrer
  const handleSubmit = (event) => {
    // on empêche le comportement par défaut du formulaire
    event.preventDefault();
    // on affiche les valeurs des champs dans la console
    console.log(`Activité enregistrée : catégorie ${category}, activité ${activity}, durée ${duration}`);
    // envoie des données au serveur ou à un autre composant
    // réinitialisation les valeurs des champs
    setCategory('');
    setActivity('');
    setDuration('');
  };

  return (
    <div className="record">

      <h2 className="record__title">Enregistrement de l'activité</h2>
      {/** à la somission du formulaire, la fonction handleSubmit est executée */}
      <form className="record__form" onSubmit={handleSubmit}>

        <div className="record__form__container">
          <label className="record__form__container__label" htmlFor="category">Catégorie :</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            required
          />
        </div>
        <div className="record__form__container">
          <label className="record__form__container__label" htmlFor="activity">Activité :</label>
          <input
            type="text"
            id="activity"
            value={activity}
            onChange={(event) => setActivity(event.target.value)}
            required
          />
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
  );
}

export default Record;
