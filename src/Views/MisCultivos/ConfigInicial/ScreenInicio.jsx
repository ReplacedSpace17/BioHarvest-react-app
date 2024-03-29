import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Header from '../../../Components/Header/Header.jsx'

import Menu from '../../../Components/Menu/Menu.jsx'

import Swal from 'sweetalert2';

import './configInicial.css';
import robot from '../../../assets/Components/ConfigInitial/robot.png';

import { getDatabase, ref, set, push } from 'firebase/database';


function ScreenInicio() {

    const navigate = useNavigate();
    const nombre = localStorage.getItem('nombre');
    const email = localStorage.getItem('email');
    const avatar = localStorage.getItem('avatar');
    const token = localStorage.getItem('token');

    const uid = localStorage.getItem('uid');
    const cultivo_id = localStorage.getItem('newCultivoId');
    // Definimos los estados para los valores seleccionados
    const [origen, setOrigen] = useState('');
    const [tipo, setTipo] = useState('');

    useEffect(() => {
        // Aquí puedes colocar cualquier lógica que necesites
        // Por ejemplo, verificar si el usuario tiene permisos para estar en esta vista
    }, [navigate]);

    // Función para manejar el envío del formulario
    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes enviar los datos del formulario a donde necesites

        submitBackend();
    };

    const regresar = () => {
        navigate('/MisCepas');
    };

    const goToLuz = () => {
        setControlIA(uid, cultivo_id, false);
        navigate('/Settings/Light');
    };
    const submitBackend = () => {
        // Aquí puedes colocar la lógica para eliminar la cepa
        //soicitando al backend

        // Una vez que se elimine la cepa, redirigir al usuario a la vista de MisCepas
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'El cultivo ha sido creado exitosamente',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            navigate('/MisCepas');
        });
    };

    const setControlIA = (UID, CID, valor) => {

        // Obtener una referencia a la base de datos de Firebase
        const db = getDatabase();
        // Referencia al nodo específico en la base de datos donde deseas escribir los datos
        const controlIA = ref(db, 'BioharvestApp/Usuarios/' + UID +  '/Fotobiorreactores/'+ CID+'/Control_IA');
        // Datos que deseas almacenar en el nodo del cultivo
        const controlIAData = {
            Control_IA: valor
        };

        // Intentar establecer los datos en la base de datos
        set(controlIA, valor)
            .then(() => {
                console.log('Datos del cultivo escritos correctamente.');
            })
            .catch((error) => {
                console.error('Error al escribir datos del cultivo:', error);
                // Manejar el error, puedes mostrar un mensaje al usuario o realizar otras acciones necesarias
            });

            //createFotoBiorreactor(UID, "sxnxj");
    };

    return (
        <body className='bodyHome'>
            <nav className='navHome'>
                <Menu />
            </nav>
            <main className='mainHome'>
                <header className='headerHome'>
                    <Header titulo="Configuración del cultivo" nombre={nombre} email={email} avatar={avatar} />
                </header>
                <div className="containerAgregarCepas">
                    <div className="containerSettingsInitial">
                        <h1 className="titleAddCepa">Configuración Inicial</h1>
                        <p className="textAddCepa">Por favor ingresa la información que te solicitemos</p>

                        <div className="containerInfoCenterSettings">
                            <div className="infoLeft">
                                <p className="textInfoLeftCenter">Bienvenido al asistente de configuración:<br></br> <br></br>
                                    A continuación configuraremos juntos los parámetros inciales del fotobiorreactor...</p>
                            </div>
                            <div className="infoRight">
                                <img src={robot} alt="icono planta" className="imgRobot" />
                            </div>
                        </div>
                        <div className="containerInfoBottomSettings">
                            <div className="infoLeftBottom">
                                <p className="textInfoLeftBottom">CID:{cultivo_id}</p>

                            </div>
                            <div className="infoRightBottom">
                               <button className="btnFormAddCepa" id='aceptar' onClick={goToLuz}>Comenzar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </body>
    );
}

export default ScreenInicio;
