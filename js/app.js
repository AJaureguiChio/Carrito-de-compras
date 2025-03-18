// Variables
const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners(){

    // Cuando agregas un curso, presionando el boton "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso)

    // Eliminar cursos del carrito
    carrito.addEventListener('click', eliminarCurso)

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito= []
        limpiarHTML();
    })

}

// Funciones
function agregarCurso(e){

    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado)
    }    

}

function eliminarCurso(e){
    console.log(e.target.classList);
    if (e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id')

        // Eliminar del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
        
        CarritoHTML() // Iterar sobre el carrito y mostrar su HTML
    }
}

// Leer el contenido del HTML y extrae la información del curso
function leerDatosCurso(curso){

    // CREAR UN OBJETO CON EL CONTENIDO DEL CURSO ACTUAL
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('p span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Comprobar si el elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
    if(existe){
        // Actualizar la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; // Retorna los objetos actualizados
            }else {
                return curso; // Retorna los objetos que no son duplicados
            }
        });
        articulosCarrito= [...cursos]
    } else {
        // Agregar el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso]
    }
    
    console.log(articulosCarrito);
    CarritoHTML()
}

// Muestra el carrtio de compras en el HTML
function CarritoHTML(){
    // Limpiar el HTML
    limpiarHTML()

    // Recorre el carrito y limpia el HTML
    articulosCarrito.forEach(curso => {
        const {titulo, precio, cantidad, imagen, id} = curso
        const row = document.createElement('tr')
        row.innerHTML =`
            <td>
                <img src='${imagen}' width='100px'>
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href='#' class='borrar-curso' data-id='${id}'> x </a></td>
        `;

        // Agregar el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

function limpiarHTML(){
    // Forma lenta
    // contenedorCarrito.innerHTML= ''

    // Forma Rápida
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}