import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { getDatabase, ref, set, update } from 'firebase/database';
import Header from '../../Components/Header/Header.jsx';
import Menu from '../../Components/Menu/Menu.jsx';
import backenURL from '../../backend.js';
import './parametros.css'

function ParametrosCultivo() {
    const [cepas, setCepas] = useState([]);
    const [controlIA, setControlIA] = useState(false);
    const [agitacion, setAgitacion] = useState(false);
    const [iluminacion, setIluminacion] = useState(false);
    const [ph, setPh] = useState(0);
    const [temperatura, setTemperatura] = useState(0);

    const navigate = useNavigate();
    const { state } = useLocation();
    const nombre = localStorage.getItem('nombre');
    const email = localStorage.getItem('email');
    const avatar = localStorage.getItem('avatar');
    const uid = localStorage.getItem('uid');
    const id_cultivo = localStorage.getItem('ID_Cultivo');

    useEffect(() => {
        obtenerCepas(uid);
        if (state) {
            // Si se recibieron valores del estado, actualizar los estados correspondientes
            setControlIA(state.getControl_IA);
            setAgitacion(state.getBomba);
            setIluminacion(state.getLuz);
            setPh(state.getPh);
            setTemperatura(state.getTemperatura);
        }
    }, [uid, state]);

    const obtenerCepas = async (id_user) => {
        try {
            const response = await axios.get(backenURL + '/api/cepas/user/' + id_user);
            if (response.status === 200) {
                setCepas(response.data);
            }
        } catch (error) {
            console.error('Error al realizar la petición:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Error en la solicitud',
                icon: 'error',
                confirmButtonText: 'Cool'
            });
        }
    };

    const regresar = () => {
        navigate(-1);
    };

    const setParametersFirebase = (event) => {
        event.preventDefault();
        const db = getDatabase();
        const cultivoBaseRef = `BioharvestApp/Usuarios/${uid}/Fotobiorreactores/${id_cultivo}`;

        const updates = {
            [`${cultivoBaseRef}/ControlBiorreactor/Bomba`]: agitacion ? 1 : 0,
            [`${cultivoBaseRef}/ControlBiorreactor/Lampara`]: iluminacion ? 1 : 0,
            [`${cultivoBaseRef}/Control_IA/Control_IA`]: controlIA ? 1 : 0,
            [`${cultivoBaseRef}/Parameters/Ph`]: ph,
            [`${cultivoBaseRef}/Parameters/Temperature`]: temperatura,
            [`${cultivoBaseRef}/Parameters/CicloDiaNoche`]: false,
            [`${cultivoBaseRef}/Parameters/LightIntensity`]: 57,
        };

        update(ref(db), updates)
            .then(() => {
                console.log('Datos del cultivo escritos correctamente.');
                navigate(-1);
            })
            .catch((error) => {
                console.error('Error al escribir datos del cultivo:', error);
            });
    };

    return (
        <div className='bodyHome'>
            <nav className='navHome'>
                <Menu />
            </nav>
            <main className='mainHome'>
                <header className='headerHome'>
                    <Header titulo="Mis cultivos" nombre={nombre} email={email} avatar={avatar} />
                </header>
                <div className="containerAgregarCepas">
                    <div className="containerFormAddCepa">
                        <h1 className="titleAddCepa">Parámetros de cultivo</h1>
                        <p className="textAddCepa">Por favor ingresa la información</p>
                        <form className="formAddCepa" onSubmit={setParametersFirebase}>
                            <div className="containerDeslizable" >
                                <label className="switch">
                                    <input type="checkbox" checked={controlIA} onChange={() => setControlIA(!controlIA)} />
                                    <span className="slider round"></span>
                                </label>
                                <span className="textInput">Control por IA</span>
                            </div>

                            <div className="containerDeslizable" >
                                <label className="switch">
                                    <input type="checkbox" checked={agitacion} onChange={() => setAgitacion(!agitacion)} />
                                    <span className="slider round"></span>
                                </label>
                                <span className="textInput">Agitación</span>
                            </div>

                            <div className="containerDeslizable">


                                <label className="switch">
                                    <input type="checkbox" checked={iluminacion} onChange={() => setIluminacion(!iluminacion)} />
                                    <span className="slider round"></span>
                                </label>
                                <span className="textInput">Iluminación</span>
                            </div>

                            <div className="containerSlideParametros">

                                <h1 className='ValueLight'>{ph} pH</h1>
                                <input
                                    type="range"
                                    id="ph"
                                    min="0"
                                    max="14"
                                    step="0.1"
                                    value={ph}
                                    onChange={(e) => setPh(parseFloat(e.target.value))}
                                />
                            </div>
                            <div className="containerSlideParametros">
                                    <h1 className='ValueLight'>{temperatura} °C</h1>
                                    <input
                                        type="range"
                                        id="temperatura"
                                        min="0"
                                        max="35"
                                        step="0.1"
                                        value={temperatura}
                                        onChange={(e) => setTemperatura(parseFloat(e.target.value))}
                                    />
                               
                            </div>

                            <div className="containerBtnFormAddCepa">
                                <button type="button" className="btnFormAddCepa" id='cancelar' onClick={regresar}>Cancelar</button>
                                <button type="submit" className="btnFormAddCepa" id='aceptar'>Aceptar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ParametrosCultivo;
