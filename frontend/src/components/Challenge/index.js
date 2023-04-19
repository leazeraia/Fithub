// import de la feuille de style
import './styles.scss';

// import des composants qui seront appelés dans le composant Challenge
import Calendar from './Calendar';
import GenerateButton from './GenerateButton';
import Record from './Record';

// création du composant Challenge
function Challenge() {
  return (
    <div className="challenge">

      <Calendar />
      <GenerateButton />
      <Record />

    </div>
  );
}

export default Challenge;
