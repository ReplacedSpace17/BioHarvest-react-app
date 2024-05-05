
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

function Home() {

    const navigate = useNavigate();

    const nombre = localStorage.getItem('nombre');
    const email = localStorage.getItem('email');
    const avatar = localStorage.getItem('avatar');
    const token = localStorage.getItem('token');
    const uid = localStorage.getItem('uid');    

    const [cepas, setCepas] = useState([]);
    const [cultivos, setCultivos] = useState([]);
    const [TipoMicroalga, setTipoMicroalga] = useState([]);

    const [MedioDulce, setMedioDulce] = useState('');
    const [MedioSalado, setMedioSalado] = useState('');

    let Dulce = 0;
    let Salado = 0;
    useEffect(() => {

        //const token = localStorage.getItem('token');

        
                if (!token) {
                    // Si no hay token, redirigir al usuario a la página de inicio de sesión
                    navigate('/Login');
                }
                // Si no hay token, redirigir al usuario a la página de inicio de sesión
        //GET CEPAS all
        
        obtenerCepas(uid);
        obtenerCultivos(uid);
        obtenerTipoCepa(uid);

    }, [uid]);

    //obtener del backend las cepas del usuario
    const obtenerCepas = async (id_user) => {
        try {
            const response = await axios.get(backenURL + '/api/cepas/user/'+id_user);
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
            const response = await axios.get(backenURL + '/api/cultivos/user/'+id_user);
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
            const response = await axios.get(backenURL + '/api/cepas/medio/'+id_user);
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
                    <Header titulo= "Inicio" nombre={nombre} email={email} avatar={avatar} />
                </header>
                <div className="containerHome">
                    <div className="sectionLeft">
                        <div className="containerCards">
                            <div className="card">
                                <CardInfoTop
                                    value="5"
                                    titulo="Especies"
                                    icono={SpecieIcon}
                                />
                            </div>
                            <div className="card">
                                <CardInfoTop
                                    value="5"
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
    aguaDulceValue={30} // Aquí pasamos el valor de dulce
    aguaSaladaValue={70} // Aquí pasamos el valor de salado
/>

                        </div>
                        <div className="Graphic">
                        <LineChartComponent data={biomasaData} />
                        </div>
                        <div className="ContainerParameters">
                            <div className="CardParameters">
                                <CardBottomCultivo 
                                especie="Value"
                                origen="Value"
                                medio="Value"
                                />

                            </div>
                            <div className="CardParameters">
                                <CardBottomParametros 
                                iluminacion="Value"
                                temperatura="Value"
                                ph="Value"
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