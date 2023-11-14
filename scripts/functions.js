//* PRODUCTOS
const getProductById = (id, db) => {
	// Busca un producto por su id, retorna el objeto en un array
	const item = db.find((item) => item.id.toString() === id)
	return item
}
export async function getProducts() {
	// Lee los productos de la DB
	try {
		const response = await fetch('./data/db.json')
		if (!response.ok) {
			throw new Error('No se encuetra el archivo json')
		}
		const products = await response.json()
		return products
	} catch (e) {
		console.log('[ERROR_DB_FETCH]', e)
		return []
	}
}
// Filtra los productos por destacados
export const getFeaturedProducts = (arr) =>
	arr.filter((product) => product.featured === true)

export const getProductsByCat = (arr, cat) =>
	arr.filter((product) => product.category.toLowerCase() === cat.toLowerCase())
export function displayProducts(element, products, displayList = false) {
	const cart = getCart()
	// Genera una galeria con los products pasados en parametro
	const galeria = document.getElementById(element)
	galeria.innerHTML = ''
	if (products.length > 0) {
		products.forEach((product) => {
			const isInCart = !displayList
				? cart.some((item) => item.id === product.id)
				: undefined
			galeria.innerHTML += `
        <article id="${element}-${product.id}">
          <img src="${product.image}" alt="">
					${
						displayList
							? `
							<h3>${product.model}</h3>
              <input type="number" value="${product.quantity}" />
              <span>$${product.price * product.quantity}</span>
							<div class='cart-qty'>
                <button class="link cart-btn-qty--minus" data-product-id="${
									product.id
								}">-</button>
								<button class="link cart-btn-qty--plus" data-product-id="${
									product.id
								}">+</button>
                <button class="link cart-btn--remove" data-product-id="${
									product.id
								}">X</button>
							</div>
							
							`
							: `
							<div class="flex card__title">
								<h3>${product.model}</h3>
								<span>$${product.price}</span>
							</div>
							<div class="cart-buttons flex flex-col">
         				<button class="cart-btn--add link ${
									!isInCart ? 'hover hover__scale hover__light' : ''
								}" type="button" data-product-id="${product.id}" ${
									isInCart ? 'disabled' : ''
							  }>
										<span class="icon"><svg><use href='#add-to-cart-icon' /></svg></span>
          			</button>
          		</div>`
					}
        </article>
        `
		})
		const addToCartButtons = document.querySelectorAll('.cart-btn--add')
		addToCartButtons.forEach((button) => {
			button.addEventListener('click', function (e) {
				return addToCart(e, products)
			})
		})
	} else {
		galeria.innerHTML += '<p>No hay productos que mostrar</p>'
	}
}
export function displayProductsByCat(e, arr) {
	const filterProdButtons = document.querySelectorAll('.btn-filter')
	const tienda = document.getElementById('tienda')
	filterProdButtons.forEach((button) => button.classList.remove('active'))
	const products =
		e.target.value === '*' ? arr : getProductsByCat(arr, e.target.value)
	displayProducts('filtered-products', products)
	e.target.classList.add('active')
	tienda.scrollIntoView({ behavior: 'smooth' }) // TODO: arreglar vista
}
//* CARRITO
export function getCart() {
	// Obtiene los productos del carro
	return JSON.parse(localStorage.getItem('cart')) || []
}
function setCart(newItem) {
	// Agrega un array de items al carro
	let cart = getCart()
	if (cart.some((item) => item.id === newItem.id)) {
		cart = cart.filter((item) => item.id !== newItem.id)
	}
	return localStorage.setItem('cart', JSON.stringify([...cart, newItem]))
}
export function subsQtyFromCart(e) {
	const cart = getCart()
	const productId = e.currentTarget.getAttribute('data-product-id')
	const input = document.querySelector(`#cart-list-${productId} input`)
	const item = cart.find((item) => item.id.toString() === productId)
	if (item) {
		if (item.quantity > 1) {
			item.quantity--
			setCart(item)
			input.value = item.quantity
			updateCart()
		} else {
			removeFromCart(e)
		}
	}
}
export function addsQtyToCart(e) {
	const cart = getCart()
	const productId = e.currentTarget.getAttribute('data-product-id')
	const input = document.querySelector(`#cart-list-${productId} input`)
	const item = cart.find((item) => item.id.toString() === productId)
	if (item) {
		item.quantity++
		setCart(item)
		input.value = item.quantity
		updateCart()
	}
}

export function addToCart(e, db) {
	// Agrega items y actualiza el carro
	const newItem = getProductById(
		e.currentTarget.getAttribute('data-product-id'),
		db
	)
	newItem.quantity = 1 // campo nuevo
	e.currentTarget.setAttribute('disabled', true)
	e.currentTarget.classList.remove('hover__scale')
	setCart(newItem)
	updateCart()
}
export function removeFromCart(e) {
	const cart = getCart()
	const productId = e.currentTarget.getAttribute('data-product-id')
	const product = document.getElementById(`cart-list-${productId}`)
	const newItems = cart.filter((item) => item.id.toString() !== productId)
	localStorage.setItem('cart', JSON.stringify([...newItems]))
	product.remove()
	if (cart.length === 1) {
		const content = document.getElementById('cart-content')
		content.innerHTML = `
      <p>No hay productos que mostrar. <a href='index.html#destacados'>Agrega items al carro</a></p>
    `
	}
	updateCart()
}

export function updateCart() {
	// Actualiza el carro
	const cart = getCart()
	const cartBtn = document.querySelector('#show-cart-btn > .count')
	const cartModal = document.getElementById('cart-modal')
	let output = ''
	if (cart?.length > 0) {
		output += '<ul>'
		cart.forEach((product) => (output += `<li>${product.model}</li>`))
		output += '</ul>'
		cartBtn.textContent = cart.length
	} else {
		output += '<p>No hay productos en el carro</p>'
	}
	cartModal.innerHTML = output
}
export function clearCart() {
	localStorage.setItem('cart', JSON.stringify([]))
	if (confirm('Gracias Por tu compra! Presiona OK para volver al home.'))
		document.location = 'index.html'
}
