/*------------------------------------ IMPORTS REACT ------------------------------------*/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import video from '../../assets/Videos/videoLogin.mp4'
import logo from '../../assets/logo_black.png'
import './login.css'
import Swal from 'sweetalert2';
import axios from 'axios';
import backenURL from '../../backend';
import { useSpring, animated } from '@react-spring/web';
/*------------------------------------ ASSETS ------------------------------------*/

/*------------------------------------ COMPONENTE ------------------------------------*/
function Login() {

  /*------------------------------------ STATES ------------------------------------*/
  // Define la animación para la entrada del aside
  const asideAnimation = useSpring({
    from: { opacity: 0, transform: 'translateX(-100%)' },
    to: { opacity: 1, transform: 'translateX(0)' },
  });
  const [formData, setFormData] = useState({

    Email: '',
    Password: ''

  });

  /*------------------------------------ NAVEGACIÓN------------------------------------*/
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Home');
  }
  const handleCreateCuenta = () => {
    navigate('/Account');
  }
  const handleHome = () => {
    navigate('/Home');
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  /*------------------------------------ SOLICITUDES ------------------------------------*/

  const handlePost = async () => {
    // Verificar si todos los campos del formulario están llenos
    for (const key in formData) {
      if (formData[key] === '') {
        Swal.fire({
          title: 'Error!',
          text: 'Por favor llena todos los campos',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        return;
      }
    }

    //verificar si el correo ya existe
    try {
      const response = await axios.post(backenURL + '/api/login/', formData);
      // Verificar el código de estado de la respuesta
      if (response.status === 200) {

        // Guardar el token en el almacenamiento local
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('nombre', response.data.nombre);
        localStorage.setItem('avatar', response.data.avatar);
        localStorage.setItem('uid', response.data.uid);
        // Redirigir a la página de inicio
        navigate('/Home');
      }
    } catch (error) {
      // Error en la solicitud
      if (error.response) {
        // El servidor ha respondido con un código de estado fuera del rango 2xx
        // Aquí puedes manejar diferentes códigos de estado de error
        if (error.response.status === 401) {
          // Lógica para el caso de error 400
          Swal.fire({
            title: 'Error!',
            text: 'Las credenciales son inválidas',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
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

  /*------------------------------------ RENDER ------------------------------------*/
  return (
    <body className='bodyApp'>
      <animated.aside style={asideAnimation} className="aside-container">
        <img src={logo} alt="Logo" className="logoLogin" />
        <p className='parrafo'>Para continuar, por favor identifícate...</p>
        <div className="containerTitulo">
          
          <h2 className='TITLE-Login'>Inicia Sesión</h2>
     
        </div>
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            type={key === 'Password' ? 'password' : 'text'} // Establecer el tipo de input como 'password' si la clave es 'Password'
            className='inputLogin'
            placeholder={key.replace(/([A-Z])/g, ' $1').trim()} // Transforma CamelCase a palabras separadas
            name={key}
            value={formData[key]}
            onChange={handleChange}
          />
        ))}

        <p className='parrafo'>¿Olvidaste tu contraseña?</p>
        <div className="containerCrearCuenta"><p className='parrafo'>¿No tienes cuenta?  </p><p className='RegistrateAqui' onClick={handleCreateCuenta}>Registrate aquí</p></div>
        <button className='buttonLogin' onClick={handlePost}>Iniciar Sesión</button>
      </animated.aside>
      <div id="video-background">

        <video autoPlay loop muted className="video">
          <source src={video} type="video/mp4" />
        </video>
      </div>
      <div className="overlay"></div>


    </body>
  )
}

export default Login