import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import medaille_or from '../../assets/images/medaille-or.png';
import medaille_argent from '../../assets/images/medaille-argent.png';
import medaille_bronze from '../../assets/images/medaille-bronze.png';
import avatar_femmme from '../../assets/images/avatar-femme.png';
import avatar_homme from '../../assets/images/avatar-homme.png';
import avatar from '../../assets/images/avatar.jpg';
import './users.css';

function Users() {
  const [dataUsers, setDataUsers] = useState([]);
  useEffect(() => {
    async function userData() {
      const response = await fetch('https://ynck-hng-server.eddi.cloud:8080/user');

      const userData = await response.json();
      const users = userData.data;
      setDataUsers(userData);
    }
    userData();
  }, []);

  return (
    <div className="container-users">
      <h1 className="container-users-title">La communauté FitHub</h1>
      <div className="contener-users">
        {dataUsers.map((user) => (
          <Link to={`${user.id}`} key={user.id} className="link-card-user">
            <div className="card-user">
              <div className="profil-user">
                <div className="image-user border-bronze">
                  <img src={user.image_path ? `https://ynck-hng-server.eddi.cloud:8080/${user.image_path}` : avatar} alt="utilisateur" />
                </div>
                <p className="nickname-user">{user.nickname}</p>
              </div>
              <div className="tag-level-user">
                <p className="level-user backgroundColor-bronze">Niveau : {(Math.sqrt(user.xp) * 0.08).toFixed(1)}</p>
                <div className="tag-user">
                  <img src={medaille_bronze} alt="medaille" />
                </div>
              </div>
              <div className="xp-views-user backgroundColor-bronze">
                <p>{user.xp} <br /> XP</p>
              </div>
            </div>
          </Link>
        ))}

        <Link to="/user" className="link-card-user">
          <div className="card-user">
            <div className="profil-user">
              <div className="image-user border-argent">
                <img src={avatar_femmme} alt="utilisateur" />
              </div>
              <p>Username</p>
            </div>
            <div className="tag-level-user">
              <p className="level-user backgroundColor-argent">Niveau 5</p>
              <div className="tag-user">
                <img src={medaille_argent} alt="medaille" />
              </div>
            </div>
            <div className="xp-views-user backgroundColor-argent">
              <p>30000 <br /> XP</p>
            </div>
          </div>
        </Link>
        <Link to="/user" className="link-card-user">
          <div className="card-user">
            <div className="profil-user">
              <div className="image-user border-bronze">
                <img src={avatar_homme} alt="utilisateur" />
              </div>
              <p>Username</p>
            </div>
            <div className="tag-level-user">
              <p className="level-user backgroundColor-bronze">Niveau 5</p>
              <div className="tag-user">
                <img src={medaille_bronze} alt="medaille" />
              </div>
            </div>
            <div className="xp-views-user backgroundColor-bronze">
              <p>30000 <br /> XP</p>
            </div>
          </div>
        </Link>
        <Link to="user" className="link-card-user">
          <div className="card-user">
            <div className="profil-user">
              <div className="image-user border-or">
                <img src={avatar_femmme} alt="utilisateur" />
              </div>
              <p>Username</p>
            </div>
            <div className="tag-level-user">
              <p className="level-user backgroundColor-or">Niveau 5</p>
              <div className="tag-user">
                <img src={medaille_or} alt="medaille" />
              </div>
            </div>
            <div className="xp-views-user backgroundColor-or">
              <p>30000 <br /> XP</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Users;
