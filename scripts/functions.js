export const getFeaturedProducts = (arr) =>
  arr.filter((product) => product.featured === true)
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || []
}
function setCart(newItemId) {
  const cart = getCart()
  return localStorage.setItem('cart', JSON.stringify([...cart, newItemId]))
}
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
  updateCart()
}

export function showCart() {
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

export async function updateCart() {
  const productsDb = await getProducts()
  const cart = getCart()
  const cartBtn = document.querySelector('#show-cart-btn > .count')
  const cartList = document.getElementById('cart-modal')
  let output = ''
  if (cart.length && cart.length > 0) {
    let prodIncart = []
    output += '<ul>'
    cart.forEach(
      (productId) =>
        (prodIncart = [
          ...prodIncart,
          ...productsDb.filter(
            (product) => product.id.toString() === productId
          ),
        ])
    ),
      prodIncart.forEach((product) => (output += `<li>${product.model}</li>`))
    output += '</ul>'
    cartBtn.textContent = cart.length
    cartList.innerHTML = output
  }
}
