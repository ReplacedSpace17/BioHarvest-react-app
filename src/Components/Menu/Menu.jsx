import React from 'react';
import './menu.css';
import logo from '../../assets/logoMenu.svg'
import home from '../../assets/icons/homeIcon.svg'
import perfil from '../../assets/icons/perfilIcon.svg'
import cultivos from '../../assets/icons/cultivosIcon.svg'
import gaia from '../../assets/icons/iaIcon.svg'
import stats from '../../assets/icons/statsIcon.svg'
import salir from '../../assets/icons/salirIcon.svg'

import { useNavigate } from 'react-router-dom';

function Menu() {
//use navigate to redirect to the desired page
const navigate = useNavigate();

const redirect = (path) => {
    navigate(path);
}
    
    return (
        <div className="containerMenu">
            <div className="logoMenu">
                <img src={logo} className='imgLogo'/>
            </div>

            <div className="opcionesMenu">
                    <div className="option" onClick={() => redirect('/Home')}><img src={home} className='icon'/><p className='optionText' >Inicio</p></div>
                    <div className="option"><img src={perfil} className='icon'/><p className='optionText'>Mi perfil</p></div>
                    <div className="option" onClick={() => redirect('/MisCultivos')}><img src={cultivos} className='icon'/><p className='optionText' >Mis cultivos</p></div>
                    <div className="option"><img src={gaia} className='icon'/><p className='optionText'>Gaia Copilot</p></div>
                    <div className="option"><img src={stats} className='icon'/><p className='optionText'>Estadísticas</p></div>
                    <div className="option" onClick={() => redirect('/Login')}><img src={salir} className='icon'/><p className='optionText' >Cerrar sesión</p></div>
                
            </div>
        </div>
    );
}

export default Menu;
