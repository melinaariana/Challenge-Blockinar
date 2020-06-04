// import './style.css';
// import axios from 'axios';

// creamos cada elemento fuera del forEach para que no vaya a pedir los datos 150 veces
const infectedTable = document.querySelector('#table-infected tbody');

// Fecha
const agregarCeroALaIzquierda = (num) => num.toString().padStart(2, '0');
const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    const dia = agregarCeroALaIzquierda(date.getDate());
    const mes = agregarCeroALaIzquierda(date.getMonth() + 1);
    const anio = date.getFullYear();

    return `${dia}/${mes}/${anio}`;
};

// Persona
const renderPersona = (persona) => {
    const personaHTML = `
        <tr>
            <th scope="row">${persona.first_name}</th>
            <td>${persona.last_name}</td>
            <td>${persona.country}</td>
            <td>${persona.live ? 'Si' : 'No'}</td>
            <td>${persona.female ? 'Mujer' : 'Hombre'}</td>
            <td>${formatearFecha(persona.infect_date)}</td>
        </tr>
        `;

    infectedTable.innerHTML += personaHTML;
};

axios.get('https://5e693ec6d426c00016b7ec9e.mockapi.io/CV1/infected').then((res) => {
    // destructuring
    const { data } = res;

    data.forEach((persona) => renderPersona(persona));
});
