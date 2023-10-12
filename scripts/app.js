import {
  getFeaturedProducts,
  getProducts,
  displayProducts,
  addToCart,
  updateCart,
} from './functions.js'

document.addEventListener('DOMContentLoaded', async () => {
  updateCart() // si habian productos en el carro en una sesion anterior los carga
  const productsDb = await getProducts()
  const featured = getFeaturedProducts(productsDb)
  displayProducts(featured) // muestra los productos en la galeria
  //* BOTONES
  const addToCartButtons = document.querySelectorAll('.cart-btn')
  const showCartBtn = document.getElementById('show-cart-btn')

  //* LISTENERS
  addToCartButtons.forEach((button) => {
    button.addEventListener('click', addToCart)
  })
  showCartBtn.addEventListener('click', () =>
    showCartBtn.classList.toggle('active')
  )

  //
  const mostrarFooterBtn = document.getElementById('mostrar-footer-btn')
  const footer = document.getElementById('footer')

  mostrarFooterBtn.addEventListener('click', function () {
    const value = footer.style.display
    if (value === 'none') {
      return (footer.style.display = 'flex')
    } else {
      return (footer.style.display = 'none')
    }
  })

  //
  const cerrarVentanaBtn = document.getElementById('cerrarmiModal')
  const miModal = document.getElementById('miModal')

  cerrarVentanaBtn.addEventListener('click', function () {
    return (miModal.style.display = 'none')
  })
})
