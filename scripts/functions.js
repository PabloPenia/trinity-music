export const getFeaturedProducts = (arr) =>
  arr.filter((product) => product.featured === true)
const cart = JSON.parse(localStorage.getItem('cart')) || []
const setCart = (newItemId) =>
  localStorage.setItem('cart', JSON.stringify([...cart, newItemId]))

export async function getProducts() {
  try {
    const response = await fetch('./data/db.json')
    if (!response.ok) {
      throw new Error('No se encuetra el archivo json')
    }
    const products = await response.json()
    return products
  } catch (e) {
    console.log(e)
    return []
  }
}

export function displayProducts(products) {
  const galeria = document.getElementById('galeria')
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
  } else {
    galeria.innerHTML += '<p>No hay productos que mostrar</p>'
  }
}
// Cart functions

export function addToCart(e) {
  setCart(e.currentTarget.getAttribute('data-product-id'))
  return updateCart()
}

export function showCart() {
  const modal = document.getElementById('cart-modal-container')
  const content = document.getElementById('cart-modal')

  return (modal.style.display =
    modal.style.display !== 'flex' ? 'flex' : 'none')

  // const prodInCart = cart.map((prodId) =>
  //   productsDb.filter((product) => product.id === prodId)
  // )
  // let output = '<h2>Tus Productos</h2>'
  // if (prodInCart.length && prodInCart.length > 0) {
  //   output += `
  // 		<ul>
  // 		${prodInCart.map((product) => `<li>${product.model}</li>`)}
  // 		</ul>
  // 		<button id="cerrarmiModal">Cerrar</button>	`
  // } else {
  //   output +=
  //     '<p>No hay elementos que mostrar.</p><p>Añade productos al carro.</p>'
  // }
  // modal.innerHTML = output
  // modal.style.display = 'block'
}

export function updateCart() {
  const cartBtn = document.querySelector('#show-cart-btn > .count')
  if (cart.length && cart.length > 0) {
    cartBtn.textContent = cart.length
  }
}
