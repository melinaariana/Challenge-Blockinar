// creamos cada elemento fuera del forEach para que no vaya a pedir los datos 150 veces
const moviesTable = document.querySelector('#table-peliculas tbody');

// Variable global con todas los datos de las peliculas
let peliculas = [];
// Variable que nos va a indicar en que orden estamos ordenando nuestros datos
// Los años serán ordenados de manera 'asc' o 'des'
let tipoOrden = 'des';

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
const renderPelicula = (pelicula) => {
    const peliculaHTML = `
        <tr class="${pelicula.ganoUnOscar ? 'fila-ganadora' : ''}">
            <th scope="row">${pelicula.nombre}</th>
            <td>${pelicula.genero}</td>
            <td>${pelicula.anio}</td>
            <td>${pelicula.ganoUnOscar ? 'Si' : 'No'}</td>
            <td>${pelicula.aprobadoPorLa7ma ? 'Aprueba' : 'No aprueba'}</td>
            <td>${formatearFecha(pelicula.fechaEstreno)}</td>
        </tr>
        `;

    moviesTable.innerHTML += peliculaHTML;
};

// Ordenar peliculas por año
const ordenar = (prop) => {
    console.log('hola');
    tipoOrden = tipoOrden === 'asc' ? 'des' : 'asc';

    const comparacion = (a, b) => {
        // Modo ascendente
        if (tipoOrden === 'asc') {
            if (a[prop] < b[prop]) return -1;
            if (b[prop] < a[prop]) return 1;
            return 0;
        } else {
            // Modo descendente
            if (a[prop] > b[prop]) return -1;
            if (b[prop] > a[prop]) return 1;
            return 0;
        }
    };
    peliculas = peliculas.sort(comparacion);
    // Elimino las peliculas que ya están pintadas
    moviesTable.innerHTML = '';
    // Y vuelvo a crearlas en orden
    peliculas.forEach((pelicula) => renderPelicula(pelicula));
};
document.getElementById('th-anio').onclick = () => ordenar('anio');
document.getElementById('th-genero').onclick = () => ordenar('genero');

// Botón de exportar en Excel
function exportTableToExcel(tableID, filename = '') {
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

    // Specify file name
    filename = filename ? filename + '.xls' : 'excel_data.xls';

    // Create download link element
    downloadLink = document.createElement('a');

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType,
        });
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
    }
}

const btnExportar = document.querySelector('#btnExportar');
btnExportar.onclick = () => exportTableToExcel('table-peliculas', (filename = 'tuViejaEnExcel'));

axios.get('https://5ed97a4d4378690016c6b058.mockapi.io/peliculas').then((res) => {
    // destructuring
    const { data } = res;

    peliculas = data;

    peliculas.forEach((pelicula) => renderPelicula(pelicula));
});
