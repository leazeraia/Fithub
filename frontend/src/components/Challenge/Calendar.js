// import de la feuille de style
import './styles.scss';

// création du composant Calendar
function Calendar() {
  // création d'un tableau contenant les 7 derniers jours
  const sevenLastDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="calendar">
      <h2 className="calendar__title">Historique des 7 derniers jours</h2>
      <div className="calendar__container">
        {/** pour chaque jour du tableau, on affiche le nom du jour et un icône */
        /** quand on map un tableau, il faut ajouter une clé unique à chaque élément
            ici on utilise la variable day qui contient le nom du jour */}
        {sevenLastDays.map((day) => (
          <div className="calendar__day" key={day}>
            <p className="calendar__day__name">{day}</p>
            <i className="fa-sharp fa-solid fa-circle-check" />
          </div>
        ))}
      </div>
    </div>

  );
}

export default Calendar;
