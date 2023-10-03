import { showSection, displayProducts } from './functions.js'

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

	mostrarFooterBtn.addEventListener('click', () => {
		showSection(footer)
	})

	//

	
	const cerrarVentanaBtn = document.getElementById('cerrarmiModal');
	const miModal = document.getElementById('miModal');

	cerrarVentanaBtn.addEventListener('click', function() {
	return	miModal.style.display = 'none';
	})

})
