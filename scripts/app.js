import { displayProducts } from './functions.js'

document.addEventListener('DOMContentLoaded', async () => {
	// function addToCart(event) {
	// 	const productId = event.currentTarget.getAttribute('data-product-id')
	// 	alert(`Agregado al carro - Product ID: ${productId}`)
	// }
	// addToCartButtons.forEach((button) => {
	// 	button.addEventListener('click', addToCart)
	// })
	// RESERVAR ESPACIO

	await displayProducts()

	//
	const mostrarFooterBtn = document.getElementById('mostrar-footer-btn')
	const footer = document.getElementById('footer')

	mostrarFooterBtn.addEventListener('click', function () {
		const value = footer.style.display
		if (value === 'none') {
			return (footer.style.display = 'flex')
			
		} else {
			return (footer.style.display = 'none')
		}

	})

	//
	const cerrarVentanaBtn = document.getElementById('cerrarmiModal')
	const miModal = document.getElementById('miModal')

	cerrarVentanaBtn.addEventListener('click', function () {
		return (miModal.style.display = 'none')
	})
})
