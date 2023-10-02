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

	const mostrarFooterBtn = document.getElementById
	('mostrar-footer-btn')
	const footer = document.getElementById('footer')
	
	mostrarFooterBtn.addEventListener('click', () => {
		showSection(footer)
	})
})

