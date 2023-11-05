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
export function displayProducts(element, products, displayList = false) {
  const cart = getCart()
  // Genera una galeria con los products pasados en parametro
  const galeria = document.getElementById(element)
  if (products.length > 0) {
    products.forEach((product) => {
      const isInCart = !displayList
        ? cart.some((item) => item.id === product.id)
        : undefined
      galeria.innerHTML += `
        <article>
          <img src="${product.image}" alt="">
					${
            displayList
              ? `
							<h3>${product.model}</h3>
							<div class='cart-qty flex'>
								<button class="link cart-btn-qty--minus" data-product-id="${
                  product.id
                }">-</button>
								<input type="number" value="${product.quantity}" />
								<button class="link cart-btn-qty--plus" data-product-id="${
                  product.id
                }">+</button>
							</div>
							<span>$${product.price * product.quantity}</span>
							<button class="link cart-btn--remove" data-product-id="${product.id}">X</button>
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
  } else {
    galeria.innerHTML += '<p>No hay productos que mostrar</p>'
  }
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
  const item = cart.find(
    (item) =>
      item.id.toString() === e.currentTarget.getAttribute('data-product-id')
  )
  if (item) {
    if (item.quantity > 2) {
      item.quantity--
      setCart(item)
      updateCart()
    } else {
      removeFromCart(e)
    }
  }
}
export function addsQtyToCart(e) {
  const cart = getCart()
  const item = cart.find(
    (item) =>
      item.id.toString() === e.currentTarget.getAttribute('data-product-id')
  )
  if (item) {
    item.quantity++
    setCart(item)
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
  // Agrega items y actualiza el carro
  const cart = getCart()
  const newItems = cart.filter(
    (item) =>
      item.id.toString() !== e.currentTarget.getAttribute('data-product-id')
  )
  localStorage.setItem('cart', JSON.stringify([...newItems]))
  updateCart()
}

export function updateCart() {
  // Actualiza el carro
  const cart = getCart()
  console.log(cart)
  const cartBtn = document.querySelector('#show-cart-btn > .count')
  const cartList = document.getElementById('cart-modal')
  let output = ''
  if (cart?.length > 0) {
    output += '<ul>'
    cart.forEach((product) => (output += `<li>${product.model}</li>`))
    output += '</ul>'
    cartBtn.textContent = cart.length
  } else {
    output += '<p>No hay productos en el carro</p>'
  }
  cartList.innerHTML = output
}
