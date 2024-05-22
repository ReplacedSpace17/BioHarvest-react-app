
//---------------------------------------------------- REACT ----------------------------------------------------//
import datos from './tabla.json'
import cultivosData from './tablaCultivos.json'
import biomasaData from './biomasa.json'
import './home.css'
import backenURL from '../../backend.js';

import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

//---------------------------------------------------- ASSETS ----------------------------------------------------//

import foto from '../../assets/img.png'
import SpecieIcon from '../../assets/Components/Icons/especie.svg';
import CultivoIcon from '../../assets/Components/Icons/cultivo.svg';
import BiomasaIcon from '../../assets/Components/Icons/biomasa.svg';

//---------------------------------------------------- COMPONENTES ----------------------------------------------------//
import Header from '../../Components/Header/Header.jsx'
import CardInfoTop from '../../Components/CardsInfo/cardTop.jsx'
import Menu from '../../Components/Menu/Menu.jsx'
import TableCepas from '../../Components/Table/TableCepas.jsx'
import TableCultivos from '../../Components/Table/TableCultivos.jsx'

import LineChartComponent from '../../Components/Graphics/Line.jsx';
import DonutChartComponent from '../../Components/Graphics/Pastel.jsx';

import CardBottomCultivo from '../../Components/CardCultivos/CardBottomCultivo.jsx'
import CardBottomParametros from '../../Components/CardCultivos/CardBottomParametros.jsx';

import axios from 'axios';
import { getDatabase, ref, onValue } from 'firebase/database';

function Home() {

    const navigate = useNavigate();

    const nombre = localStorage.getItem('nombre');
    const email = localStorage.getItem('email');
    const avatar = localStorage.getItem('avatar');
    const token = localStorage.getItem('token');
    const uid = localStorage.getItem('uid');

    const [cepas, setCepas] = useState([]);
    const [totalCepas, setTotalCepas] = useState([0]);
    const [totalCultivos, setTotalCultivos] = useState([0]);

    const [cultivos, setCultivos] = useState([]);
    const [TipoMicroalga, setTipoMicroalga] = useState([]);

    const [MedioDulce, setMedioDulce] = useState(0);
    const [MedioSalado, setMedioSalado] = useState(0);
    const [CultivoID, setCultivoID] = useState(0);

    let Dulce = 0;
    let Salado = 0;

    const [iluminacion, setIluminacion] = useState(0);
    const [temperatura, setTemperatura] = useState(0);
    const [ph, setPh] = useState(0);

    //estados para especieActiva, origenActivo, motivoActivo
    const [especieActiva, setEspecieActiva] = useState('Default');
    const [origenActivo, setOrigenActivo] = useState('Default');
    const [motivoActivo, setMotivoActivo] = useState('Default');


    const [controlIAHome, setControlIAHome] = useState(false);
const [agitacionHome, setAgitacionHome] = useState(false);
const [iluminacionHome, setIluminacionHome] = useState(false);
const [phHome, setPhHome] = useState(0); 
const [temperaturaHome, setTemperaturaHome] = useState(0);

    useEffect(() => {
        const cultivoID = localStorage.getItem('ID_Cultivo');
        setEspecieActiva(localStorage.getItem('Especie_Cultivo'));
        setOrigenActivo(localStorage.getItem('Origen_Cultivo'));
        setMotivoActivo(localStorage.getItem('Motivo_Cultivo'));
      
        //const token = localStorage.getItem('token');


        if (!token) {
            // Si no hay token, redirigir al usuario a la página de inicio de sesión
            navigate('/Login');
        }
        // Si no hay token, redirigir al usuario a la página de inicio de sesión
        //GET CEPAS all

        obtenerCepas(uid);
        obtenerCultivos(uid);
       // obtenerTipoCepa(uid);
        getTotalCepas(uid);
        getTotalCultivos(uid);

        // Establecer la referencia a la base de datos de Firebase
        const db = getDatabase();
        const sensoresRef = ref(db, `BioharvestApp/Usuarios/${uid}/Fotobiorreactores/${cultivoID}/SensoresRealtime`);
        const parametrosRef = ref(db, `BioharvestApp/Usuarios/${uid}/Fotobiorreactores/${cultivoID}/SensoresRealtime`);

        // Suscribirse a los cambios en los valores de los sensores
        const updateValues = (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setIluminacion(data.SensorLight);
                setTemperatura(data.SensorTemperature);
                setPh(data.SensorPh);
            }
        };

        // Manejar los errores en la suscripción
        const errorHandler = (error) => {
            console.error('Error en la suscripción a los sensores:', error);
            // Manejar el error, por ejemplo, mostrar un mensaje al usuario
        };

        // Suscribirse a los cambios en los valores de los sensores
        onValue(sensoresRef, updateValues, { onlyOnce: false, error: errorHandler });

        // Limpiar la suscripción cuando el componente se desmonte
        return () => {
            // Desuscribirse de los cambios en los valores de los sensores
            onValue(sensoresRef, null);
        };

       
    }, [uid]);

    //obtener el total de cultivos
    const getTotalCepas = async (id_user) => {
        try {
            const response = await axios.get(backenURL + '/api/cepas/total/' + id_user);
            // Verificar el código de estado de la respuesta
            if (response.status === 200) {
                // Asignar la respuesta al estado de cepas
                setTotalCepas(response.data);
                const data = response.data;

                // Calcular los porcentajes de dulce y salado
                const total = data.total;
                const porcentajeDulce = Math.round((data.dulce / total) * 100);
                const porcentajeSalado = Math.round((data.salado / total) * 100);
                setMedioDulce(porcentajeDulce);
                setMedioSalado(porcentajeSalado);
                console.log(porcentajeDulce);
                console.log(porcentajeSalado);
                console.log(response.data);
                
            }
        } catch (error) {
            }
    };

    const getTotalCultivos = async (id_user) => {
        try {
            const response = await axios.get(backenURL + '/api/cultivos/count/' + id_user);
            // Verificar el código de estado de la respuesta
            if (response.status === 200) {
                // Asignar la respuesta al estado de cepas
                setTotalCultivos(response.data);
                console.log(response.data);
            }
        } catch (error) {
            }
    };
    //obtener del backend las cepas del usuario
    const obtenerCepas = async (id_user) => {
        try {
            const response = await axios.get(backenURL + '/api/cepas/user/' + id_user);
            // Verificar el código de estado de la respuesta
            if (response.status === 200) {
                // Asignar la respuesta al estado de cepas
                setCepas(response.data);
                console.log(response.data);
            }
        } catch (error) {
            // Error en la solicitud
            if (error.response) {
                // El servidor ha respondido con un código de estado fuera del rango 2xx
                // Aquí puedes manejar diferentes códigos de estado de error
                if (error.response.status === 401) {
                    // Lógica para el caso de error 400

                } else {
                    // Otros códigos de estado de error
                    Swal.fire({
                        title: 'Error!',
                        text: 'Error en la solicitud',
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    });
                }
            } else {
                // Error sin respuesta del servidor
                console.error('Error al realizar la petición:', error);
                // Manejo de errores, puedes mostrar un mensaje al usuario o realizar otras acciones necesarias
            }
        }
    };

    const obtenerCultivos = async (id_user) => {
        try {
            const response = await axios.get(backenURL + '/api/cultivos/user/' + id_user);
            // Verificar el código de estado de la respuesta
            if (response.status === 200) {
                // Asignar la respuesta al estado de cepas
                setCultivos(response.data);
                console.log(response.data);


            }
        } catch (error) {
            // Error en la solicitud
            if (error.response) {
                // El servidor ha respondido con un código de estado fuera del rango 2xx
                // Aquí puedes manejar diferentes códigos de estado de error
                if (error.response.status === 401) {
                    // Lógica para el caso de error 400

                } else {
                    // Otros códigos de estado de error
                    Swal.fire({
                        title: 'Error!',
                        text: 'Error en la solicitud',
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    });
                }
            } else {
                // Error sin respuesta del servidor
                console.error('Error al realizar la petición:', error);
                // Manejo de errores, puedes mostrar un mensaje al usuario o realizar otras acciones necesarias
            }
        }
    };

    const obtenerTipoCepa = async (id_user) => {
        try {
            const response = await axios.get(backenURL + '/api/cepas/medio/' + id_user);
            // Verificar el código de estado de la respuesta
            if (response.status === 200) {
                console.log(response.data);
                //obtener el porcetnaje del 0 al 100 que le corresponde 
                const total = parseInt(response.data.Dulce) + parseInt(response.data.Salada);

                //obtener el porcentaje de dulce (response.data.Dulce/total)*100
                //obtener el porcentaje de salado (response.data.Salada/total)*100
                setTipoMicroalga(response.data);




            }
        } catch (error) {
            // Error en la solicitud
            if (error.response) {
                // El servidor ha respondido con un código de estado fuera del rango 2xx
                // Aquí puedes manejar diferentes códigos de estado de error
                if (error.response.status === 401) {
                    // Lógica para el caso de error 400

                } else {
                    // Otros códigos de estado de error
                    Swal.fire({
                        title: 'Error!',
                        text: 'Error en la solicitud',
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    });
                }
            } else {
                // Error sin respuesta del servidor
                console.error('Error al realizar la petición:', error);
                // Manejo de errores, puedes mostrar un mensaje al usuario o realizar otras acciones necesarias
            }
        }
    };


    return (
        <body className='bodyHome'>
            <nav className='navHome'>
                <Menu />
            </nav>
            <main className='mainHome'>
                <header className='headerHome'>
                    <Header titulo="Inicio" nombre={nombre} email={email} avatar={avatar} />
                </header>
                <div className="containerHome">
                    <div className="sectionLeft">
                        <div className="containerCards">
                            <div className="card">
                                <CardInfoTop
                                    value={totalCepas.total}
                                    titulo="Especies"
                                    icono={SpecieIcon}
                                />
                            </div>
                            <div className="card">
                                <CardInfoTop
                                    value={totalCultivos.cultivo_count}
                                    titulo="Cultivos"
                                    icono={CultivoIcon}
                                />
                            </div>
                            <div className="card">
                                <CardInfoTop
                                    value="5"
                                    titulo="Biomasa (gr)"
                                    icono={BiomasaIcon}
                                />
                            </div>

                        </div>
                        <div className="Table">
                            <TableCepas data={cepas} />
                        </div>
                        <div className="Table">
                            <TableCultivos data={cultivos} />
                        </div>
                        <div className="separator">
                        </div>


                    </div>
                    <div className="sectionRight">
                        <div className="Graphic">
                            <DonutChartComponent
                                Title="Tipo de Microalga"
                                aguaDulceValue={60} // Aquí pasamos el valor de dulce
                                aguaSaladaValue={40} // Aquí pasamos el valor de salado
                            />

                        </div>
                        <div className="Graphic">
                            <LineChartComponent data={biomasaData} />
                        </div>
                        <div className="ContainerParameters">
                            <div className="CardParameters">
                                <CardBottomCultivo
                                    especie={especieActiva}
                                    origen={origenActivo}
                                    medio={motivoActivo}
                                />

                            </div>
                            <div className="CardParameters">
                            <CardBottomParametros
                                iluminacion={iluminacion}
                                temperatura={temperatura}
                                ph={ph}
                                getControl_IA ={true} 
                                getBomba={true}
                                getLuz={true}
                                getPh={3.3}
                                getTemperatura={25}
                            />
                            </div>
                        </div>
                        <div className="separator">

                        </div>


                    </div>
                </div>
            </main>
        </body>
    );
}
export default Home;