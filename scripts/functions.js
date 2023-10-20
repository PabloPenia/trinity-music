//* PRODUCTOS
const getProductById = (id, db) => {
  // Busca un producto por su id, retorna el objeto en un array
  const item = db.filter((item) => item.id.toString() === id)
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
export function displayProducts(products) {
  // Genera una galeria con los products pasados en parametro
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
//* CARRITO
export function getCart() {
  // Obtiene los productos del carro
  return JSON.parse(localStorage.getItem('cart')) || []
}
function setCart(newItems) {
  // Agrega un array de items al carro
  const cart = getCart()
  return localStorage.setItem('cart', JSON.stringify([...cart, ...newItems]))
}
export function addToCart(e, db) {
  // Agrega items y actualiza el carro
  const newItem = getProductById(
    e.currentTarget.getAttribute('data-product-id'),
    db
  )
  setCart(newItem)
  updateCart()
}

export function updateCart() {
  // Actualiza el carro
  const cart = getCart()
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
