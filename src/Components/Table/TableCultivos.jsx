import React, { useState } from 'react';
import './Tablecultivos.css';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert2';

function TableCultivos({ data }) {
    const [searchTerm, setSearchTerm] = useState('');

    // Filtrar los datos por el nombre
    const filteredData = data.filter(item =>
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    


    const navigate = useNavigate();
    
    const goToCultivos= () => {
        navigate('/MisCultivos', { state: { datos: data } });
    };

    const setID_Cultivo = (ID, nombre, especie, origen, motivo) => {
        //mensaje de cultivo selccionadoo
        localStorage.setItem('ID_Cultivo', ID);
        localStorage.setItem('Nombre_Cultivo', nombre);
        localStorage.setItem('Especie_Cultivo', especie);
        localStorage.setItem('Origen_Cultivo', origen);
        localStorage.setItem('Motivo_Cultivo', motivo);
        swal.fire({
            title: 'Obteniendo datos...',
            text: nombre + ' seleccionado',
            icon: 'success',
            timer: 1000,
            showConfirmButton: false
        });
        //DESPUES DEL SWAL RECARGAR LA PAGINA
        setTimeout(() => {
            window.location.reload();
        }, 1000);
        
    };
  

    return (
        <div className="containerCardTable">
            <div className="elementsTopContainer">
                <h1 className='TitleTable' onClick={goToCultivos}>Mis cultivos</h1>
                <input
                    type="text"
                    placeholder="Buscar por nombre"
                    className="inputSearch"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="containerTable">
                <table className='tableT2'>
                    <thead className='theadT2'>
                        <tr className='trT2'>
                            <th className='thdT2'>ID</th>
                            <th className='thdT2'>Nombre de cultivo</th>
                            <th className='thdT2'>Especie</th>
                            <th className='thdT2'>Motivo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr className='trT2' key={item.id} onClick={() => setID_Cultivo(item.id, item.nombre, item.nombre_cepa, item.origen, item.motivo)}>
                                <td className='tdT2'>{index +1}</td>
                                <td className='tdT2'>{item.nombre}</td>
                                <td className='tdT2'>{item.nombre_cepa}</td>
                                <td className='tdT2'>{item.motivo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TableCultivos;
