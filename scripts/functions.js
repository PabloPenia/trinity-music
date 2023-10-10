async function getProducts() {
	try {
		const response = await fetch('./data/db.json')
		if (!response.ok) {
			throw new Error('No se encuetra el archivo json')
		}
		const products = await response.json()
		console.log(products)
		return products
	} catch (e) {
		console.log(e)
	}
}

async function getFeaturedProducts() {
	try {
		const products = await getProducts()
		console.log(products.filter((product) => product.featured))
		return products.filter((product) => product.featured)
	} catch (e) {
		console.log(e)
	}
}

export async function displayProducts() {
	try {
		const galeria = document.getElementById('galeria')
		const products = await getProducts()
		if (products.length > 0) {
			products.forEach((product) => {
				galeria.innerHTML += `
			<article>
				<img src="${product.image}" alt="">
				<div class="flex card__title">
					<h3>${product.model}</h3>
					<span>$${product.price}</span>
				</div>
				<button class="cart-btn btn flex" type="button" data-product-id="${product.id}"><span class="icon"><svg>
							<use href='#add-to-cart-icon' />
						</svg></span>
				</button>
			</article>
			`
			})
		}
	} catch (e) {
		console.log(e)
	}
}

export function addToCart(e) {
	const productId = e.currentTarget.getAttribute('data-product-id')
	const cart = JSON.parse(localStorage.getItem('cart')) || []
	localStorage.setItem('cart', JSON.stringify([...cart, productId]))
	updateCart()
}

// export function showCart() {
// 	const modal = document.querySelector('#miModal > miModal-contenido')
// 	const cart = JSON.parse(localStorage.getItem('cart')) || []
// 	const products = await getProducts()
// 	const prodInCart = cart.map(prodId => products.filter(product => product.id === prodId))

// 	modal?.innerHTML = prodInCart?.length && prodInCart.length > 0 ? (`
// 		<div class="miModal-contenido">
//       <h2>Suscríbete para tener las ultimas novedades</h2>
//       <p>¡Se el primero en enterarte de lo que llega a la tienda!</p>
//       <input type="email-sus" placeholder="Ingresa tu e-mail">
//       <button type="submit" class="btnSuscribirme"><span>Suscribirme</span></button>
//       <button id="cerrarmiModal">Cerrar</button>
//     </div>`) : `No hay elementos que mostrar`
// }

export function getCart() {
	return JSON.parse(localStorage.getItem('cart')) || []
}

export function updateCart() {
	const cart = getCart()
	const cartBtn = document.querySelector('.cart span')
	if (cart?.length && cart.length > 0) {
		cartBtn.textContent = cart.length
	}
}
