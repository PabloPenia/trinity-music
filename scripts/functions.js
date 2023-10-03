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
				<button onClick="alert('Agregado al carrito')" class="cart-btn btn flex" type="button" data-product-id="${product.id}"><span class="icon"><svg>
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
