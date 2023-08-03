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
