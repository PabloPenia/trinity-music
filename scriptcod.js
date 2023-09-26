// OCULTAR ELEMENTOS HTML CON JS Y CSS

// Codigo html para el script

//  <section id="seccion">
//     Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla ullam provident dolore quas recusandae laudantium
//     doloribus quae a officiis, dolorem, at mollitia sunt tempora hic fugiat corporis numquam rerum labore.</section>
//   <button id="boton" onclick="showSection()">Mostrar seccion</button>

const showElement = document.getElementById('contenedor-footer') // selecciono elemento html
function showSection() {
	if (showElement.style.display === 'none') {
		// si el elemento esta oculto lo muestro
		showElement.style.display = 'block'
	} else {
		// si el elemento se muestra lo oculto
		showElement.style.display = 'none'
	}
}

// leeme: PUTO EL QUE LEE
// en app.js
const buttonFooter = document.getElementById('ID DEL BOTON') // primero guardo en variables cada boton
const footer = document.getElementById('ID DE LA CAJA') // y cada caja que voy a modificar
buttonFooter.addEventListener('click', () => mostrarSeccion(buttonFooter, footer)) // agrego el listener, y le paso como primer argumento el boton, segundo la caja

// a functions.js
function showSection(boton, caja) {
	if (caja.style.display === 'none') {
		caja.style.display = 'block'
	} else {
		caja.style.display = 'none'
	}
}



// ITERAR UN ARRAY (pseudo database)

// array de productos a iterar
const productos = [
	{
		id: 1,
		nombre: 'Stratocaster',
		categoria: 'guitarras',
		marca: 'Fender',
		precio: 10,
	},
	{
		id: 2,
		nombre: 'bajo2',
		categoria: 'bajos',
		marca: 'Samick',
		precio: 1,
	},
]

function buscarPorNombre(terminoDeBusqueda) {
	// el metodo filter devuelve un nuevo array de elementos qe coincidan con lacondicion dada.
	// 1. si la condicion se cumple coloca el item en e nuevo array
	// 2. S no se cumple sigue iterando hasta el final.
	// en este caso la condicion es que el nombre del producto sea igual al termino de busqeda.
	// el array resultante solo tendra los elementos que coincidan con la busqueda.
	const productosFiltrados = productos.filter(
		(item) => item.nombre === terminoDeBusqueda
	)buttonfooter
	return productosFiltrados
}

const carrousel = document.querySelector('.carrousel')
const images = carrousel.querySelectorAll('img')

let counter = 0
const slideWidth = images[0].clientWidth
const slideInterval = 9000 // Intervalo de tiempo entre las transiciones (en milisegundos)

// Función para pasar a la siguiente imagen
function nextSlide() {
	counter++
	carrousel.style.transform = `translateX(${-slideWidth * counter}px)`

	// Si alcanza el final del carrousel, vuelve al principio
	if (counter === images.length) {
		counter = 0
		setTimeout(() => {
			carrousel.style.transform = 'translateX(0)'
		}, slideInterval / 2) // Tiempo de espera antes de volver al principio (la mitad del intervalo de tiempo)
	}
}

// Iniciar el movimiento automático
let slideTimer = setInterval(nextSlide, slideInterval)

// Funciones para pausar/reanudar el movimiento automático al interactuar con el carrousel
carrousel.addEventListener('mouseenter', () => {
	clearInterval(slideTimer)
})

carrousel.addEventListener('mouseleave', () => {
	slideTimer = setInterval(nextSlide, slideInterval)
})
//ayno!

