// import de la feuille de style
import './styles.scss';
// import de la librairie PropTypes pour configurer et valider les props
import PropTypes from 'prop-types';

// création du composant GenerateButton
// il prend en props une fonction qui sera appelée au clic sur le bouton
// cette fonction est définie dans le composant Challenge
function GenerateButton({ onClick }) {
  return (
    <div className="generateButton">
      <button className="generateButton__button" type="button" onClick={onClick}>Générer mon défis quotidien !</button>
    </div>
  );
}

// validation des props : onClick est obligatoire et doit être une fonction
GenerateButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default GenerateButton;
