import {
	getFeaturedProducts,
	getProducts,
	displayProducts,
	removeFromCart,
	getCart,
	updateCart,
	subsQtyFromCart,
	addsQtyToCart,
	displayProductsByCat,
	clearCart,
} from './functions.js'

document.addEventListener('DOMContentLoaded', async () => {
	updateCart() // si habian productos en el carro en una sesion anterior los carga
	// codigo que se ejecuta segun la URL
	if (window.location) {
		switch (window.location.pathname) {
			case '/index.html':
			case '/':
				// ACA SOLO PARA EL HOME
				const productsDb = await getProducts()
				const featured = getFeaturedProducts(productsDb)
				const filterProdButtons = document.querySelectorAll('.btn-filter')
				displayProducts('galeria', featured) // muestra los productos detacados
				// Productos y filtros
				displayProducts('filtered-products', productsDb) // Por defecto muestra todos los productos
				filterProdButtons.forEach((button) => {
					// Filtra productos por categoria
					button.addEventListener('click', (e) =>
						displayProductsByCat(e, productsDb)
					)
				})
				// Modal Suscribirse
				const cerrarVentanaBtn = document.getElementById('cerrarmiModal')
				const miModal = document.getElementById('miModal')

				cerrarVentanaBtn.addEventListener('click', function () {
					return (miModal.style.display = 'none')
				})
				break
			case '/cart.html':
				// Pagina del carro
				const cart = getCart()
				const content = document.getElementById('cart-content')
				if (cart?.length > 0) {
					content.innerHTML = `
            <p>Verifica tus productos antes de realizar la compra.</p>
            <div id="cart-list" class="flex flex-col"></div>
            <a href="checkout.html" class="link hover hover__light hover__scale">Pagar</a>
          `
					displayProducts('cart-list', cart, true) // Muestra el carro en formato lista
					// sumar, restar y eliminar productos
					const subsQtyBtn = document.querySelectorAll('.cart-btn-qty--minus')
					const addsQtyBtn = document.querySelectorAll('.cart-btn-qty--plus')
					const removeBtn = document.querySelectorAll('.cart-btn--remove')
					subsQtyBtn.forEach((button) => {
						button.addEventListener('click', subsQtyFromCart)
					})
					addsQtyBtn.forEach((button) => {
						button.addEventListener('click', addsQtyToCart)
					})
					removeBtn.forEach((button) => {
						button.addEventListener('click', removeFromCart)
					})
				} else {
					content.innerHTML = `
            <p>No hay productos que mostrar. <a href='index.html#destacados'>Agrega items al carro</a></p>
          `
				}
				break
			case '/checkout.html':
				// Pagina del formulario
				const checkoutBtn = document.getElementById('checkoutBtn')
				checkoutBtn?.addEventListener('click', clearCart)
			default:
				// Resto de paginas sin contar la anteriores
				break
		}
	}
	// CODIGO PARA TODAS LAS PAGINAS (footer / header)
	// Mostrar modal del carro
	const showCartBtn = document.getElementById('show-cart-btn')
	showCartBtn.addEventListener('click', () =>
		showCartBtn.classList.toggle('active')
	)

	// Footer
	const mostrarContactoBtn = document.getElementById('mostrar-contacto-btn')
	const contacto = document.getElementById('contacto')

	const mostrarNosotrosBtn = document.getElementById('mostrar-nosotros-btn')
	const nosotros = document.getElementById('nosotros')

	const mostrarTiendasBtn = document.getElementById('mostrar-tiendas-btn')
	const tiendas = document.getElementById('tiendas')

	mostrarContactoBtn.addEventListener('click', function () {
		nosotros.classList.remove('active')
		tiendas.classList.remove('active')
		contacto.classList.toggle('active')

		if (contacto.classList.contains('active')) {
			contacto.scrollIntoView({ behavior: 'smooth' })
		}
	})

	mostrarNosotrosBtn.addEventListener('click', function () {
		contacto.classList.remove('active')
		tiendas.classList.remove('active')
		nosotros.classList.toggle('active')

		if (nosotros.classList.contains('active')) {
			nosotros.scrollIntoView({ behavior: 'smooth' })
		}
	})

	mostrarTiendasBtn.addEventListener('click', function () {
		contacto.classList.remove('active')
		nosotros.classList.remove('active')
		tiendas.classList.toggle('active')

		if (tiendas.classList.contains('active')) {
			tiendas.scrollIntoView({ behavior: 'smooth' })
		}
	})
})
