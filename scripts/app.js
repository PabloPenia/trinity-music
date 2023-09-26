import {showSection} from './functions.js'

document.addEventListener('DOMContentLoaded', () => {
	const addToCartButtons = document.querySelectorAll('.cart-btn')
	function addToCart(event) {
		const productId = event.currentTarget.getAttribute('data-product-id')
		alert(`Agregado al carro - Product ID: ${productId}`)
	}
	addToCartButtons.forEach((button) => {
		button.addEventListener('click', addToCart)
	})

	const showElement = document.getElementById('contenedor-footer') // selecciono elemento html
})

