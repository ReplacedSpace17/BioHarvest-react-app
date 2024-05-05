import React, { useState } from 'react';
import './table.css';
import { useNavigate } from 'react-router-dom';


function Table({ data }) {
    const [searchTerm, setSearchTerm] = useState('');

    // Filtrar los datos por el nombre
    const filteredData = data.filter(item =>
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const navigate = useNavigate();

    const goToCepas = () => {
        navigate('/MisCepas', { state: { datos: data } });
    };

    return (
        <div className="containerCardTable">
            <div className="elementsTopContainer">
                <h1 className='TitleTable' onClick={goToCepas}>Mis cepas</h1>
                <input
                    type="text"
                    placeholder="Buscar por nombre"
                    className="inputSearch"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="containerTable">
                <table className='tableT1'>
                    <thead className='theadT1'>
                        <tr className='trT1'>
                        <th className='thdT1'>ID</th>
                            <th className='thdT1'>Nombre</th>
                            <th className='thdT1'>Origen</th>
                            <th className='thdT1'>Medio</th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredData.map((item, index) => (
                            <tr className='trT1' key={item.id}>
                                <td className='tdT1'>{index + 1}</td>
                                <td className='tdT1'>{item.nombre}</td>
                                <td className='tdT1'>{item.origen}</td>
                                <td className='tdT1'>{item.medio}</td>
                         
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;
