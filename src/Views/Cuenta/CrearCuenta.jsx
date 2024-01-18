import { useNavigate } from 'react-router-dom';
import video from '../../assets/Videos/videoLogin.mp4'
import logo from '../../assets/logo_black.png'
import './crearCuenta.css'

import { useSpring, animated } from '@react-spring/web';

function CrearCuenta() {
    // Define la animación para la entrada del aside
    const asideAnimation = useSpring({
      from: { opacity: 0, transform: 'translateX(+100%)' },
      to: { opacity: 1, transform: 'translateX(0)' },
    });

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Login');
  }

  return (
    <body className='bodyAppAcount'>
      <animated.aside style={asideAnimation} className="aside-container">
        <img src={logo} alt="Logo" className="logoLogin" />
        <p className='parrafo'>Para continuar, por favor identifícate...</p>
        <div className="containerTitulo">
          <h2 className='TITLE-Login'>Crea tu cuenta</h2>
        </div>
        <input type="text" className='inputLogin' placeholder="example@gmail.com" />
        <input type="text" className='inputLogin' placeholder="example@gmail.com" />
        <input type="text" className='inputLogin' placeholder="example@gmail.com" />
        <input type="text" className='inputLogin' placeholder="example@gmail.com" />
        <input type="text" className='inputLogin' placeholder="example@gmail.com" />
        <input type='password' className='inputLogin' placeholder="*********" />
        <p className='parrafo'>¿Olvidaste tu contraseña?</p>
        <div className="containerCrearCuenta"><p className='parrafo'>¿No tienes cuenta?  </p><p className='RegistrateAqui'>Registrate aquí</p></div>
        <button className='buttonLogin' onClick={handleClick}>Iniciar Sesión</button>
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

export default CrearCuenta