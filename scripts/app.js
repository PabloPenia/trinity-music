import {
  getFeaturedProducts,
  getProducts,
  displayProducts,
  addToCart,
  getCart,
  updateCart,
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
        displayProducts(featured) // muestra los productos en la galeria

        const addToCartButtons = document.querySelectorAll('.cart-btn')
        addToCartButtons.forEach((button) => {
          button.addEventListener('click', function (e) {
            return addToCart(e, productsDb)
          })
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
        console.log(cart)
        break
      case '/checkout.html':
      // Pagina del formulario
      default:
        // Resto de paginas sin contar la anteriores
        break
    }
  }
  // Mostrar modal del carro
  const showCartBtn = document.getElementById('show-cart-btn')
  showCartBtn.addEventListener('click', () =>
    showCartBtn.classList.toggle('active')
  )

  //
  const mostrarContactoBtn = document.getElementById('mostrar-contacto-btn')
  const contacto = document.getElementById('contacto')

  const mostrarNosotrosBtn = document.getElementById('mostrar-nosotros-btn')
  const nosotros = document.getElementById('nosotros')

  mostrarContactoBtn.addEventListener('click', function () {
    nosotros.classList.remove('active')
    contacto.classList.toggle('active')

    if (contacto.classList.contains('active')) {
      // Scroll to the newly displayed element
      contacto.scrollIntoView({ behavior: 'smooth' })
    }
  })

  mostrarNosotrosBtn.addEventListener('click', function () {
    contacto.classList.remove('active')
    nosotros.classList.toggle('active')

    if (nosotros.classList.contains('active')) {
      // Scroll to the newly displayed element
      nosotros.scrollIntoView({ behavior: 'smooth' })
    }
  })

  //
})
