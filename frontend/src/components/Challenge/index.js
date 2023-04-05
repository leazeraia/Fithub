// import de la feuille de style
import './styles.scss';
// import du hook useState
import { useState } from 'react';

// import des composants qui seront appelés dans le composant Challenge
import Calendar from './Calendar';
import GenerateButton from './GenerateButton';
import Record from './Record';

// création du composant Challenge
function Challenge() {
  // création d'un state challenge qui contiendra le défi généré
  // le tableau vide est la valeur par défaut du state
  // le premier élément du tableau est la valeur du state
  // le second élément du tableau est une fonction qui permet de modifier la valeur du state
  const [challenge, setChallenge] = useState('');

  // fonction qui génère un défi aléatoire
  // elle est appelée dans la fonction handleGenerateChallenge
  // la fonction handleGenerateChallenge est celle qui est appelée au clic sur le bouton
  const generateChallenge = () => {
    const challenges = [
      'Faire 10 pompes',
      'Faire 10 abdos',
      'Marcher 5km',
      'Faire 30 secondes de gainage',
      'Prendre les escaliers à chaque occasion'];

    // la variable randomChallenge contient un défi aléatoire
    // il est généré en générant aléatoirement un index du tableau challenges
    // La fonction Math.random() génère un nombre aléatoire entre 0 et 1
    // puis on le multiplie par la longueur du tableau challenges
    // puis on utilise la fonction Math.floor() pour arrondir le résultat
    // ainsi, l'index du défi aléatoire est un nombre entier entre 0 et 4
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    // on met à jour le state challenge avec la valeur du défi aléatoire
    setChallenge(randomChallenge);
    // on n'oublie pas de retourner la valeur du défi aléatoire
    return randomChallenge;
  };

  const handleGenerateChallenge = () => {
    // le challenge généré contient la valeur du défi aléatoire
    const generatedChallenge = generateChallenge();
    console.log(generatedChallenge);
    // ou afficher le challenge dans un composant
  };

  return (
    <div className="challenge">

      <Calendar />
      <GenerateButton onClick={handleGenerateChallenge} />
      <Record />

    </div>
  );
}

export default Challenge;
