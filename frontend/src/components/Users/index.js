import React from 'react';
import { Link } from 'react-router-dom';
import medaille_or from '../../assets/images/medaille-or.png';
import medaille_argent from '../../assets/images/medaille-argent.png';
import medaille_bronze from '../../assets/images/medaille-bronze.png';
import avatar_femmme from '../../assets/images/avatar-femme.png';
import avatar_homme from '../../assets/images/avatar-homme.png';
import "./users.css";

function Users() {
  return (
    <div className="container-users">
        <h1>La communauté FitHub</h1>
        <div className="contener-users">
            <Link to={"/user"} className='link-card-user'>
                <div className="card-user">
                    <div className="profil-user">
                        <div className="image-user border-or">
                            <img src={"https://static01.nyt.com/images/2013/11/19/arts/Book-tyson/Book-tyson-articleLarge.jpg?quality=75&auto=webp&disable=upscale"} alt="utilisateur" />
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
                        <p className='last-xp-views'>15000 <br /> VUES</p>
                    </div>
                </div>
            </Link>
            <Link to={'/user'} className='link-card-user'>
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
                        <p className='last-xp-views'>15000 <br /> VUES</p>
                    </div>
                </div>
            </Link>
            <Link to={"/user"} className='link-card-user'>
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
                        <p className='last-xp-views'>15000 <br /> VUES</p>
                    </div>
                </div>
            </Link>
            <Link to="user" className='link-card-user'>
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
                        <p className='last-xp-views'>15000 <br /> VUES</p>
                    </div>
                </div>
            </Link>
        </div>
    </div>
  )
}

export default Users