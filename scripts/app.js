import {
  getFeaturedProducts,
  getProducts,
  displayProducts,
  addToCart,
  removeFromCart,
  getCart,
  updateCart,
  subsQtyFromCart,
  addsQtyToCart,
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
        displayProducts('galeria', featured) // muestra los productos en la galeria

        const addToCartButtons = document.querySelectorAll('.cart-btn--add')
        addToCartButtons.forEach((button) => {
          button.addEventListener('click', function (e) {
            return addToCart(e, productsDb)
          })
        })
        const removeFromCartButtons =
          document.querySelectorAll('.cart-btn--remove')
        removeFromCartButtons.forEach((button) => {
          button.addEventListener('click', removeFromCart)
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
        displayProducts('cart-list', cart, true)
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

    if (contacto.classList.contains("active")) {
      contacto.scrollIntoView({ behavior: "smooth"});
    }
 })

  mostrarNosotrosBtn.addEventListener("click", function () {
    contacto.classList.remove("active")
    tiendas.classList.remove('active')
    nosotros.classList.toggle("active")

    if (nosotros.classList.contains("active")) {
      nosotros.scrollIntoView({ behavior: "smooth"});
    }
})

  mostrarTiendasBtn.addEventListener("click", function () {
    contacto.classList.remove("active")
    nosotros.classList.remove('active')
    tiendas.classList.toggle("active")

  if (tiendas.classList.contains("active")) {
    tiendas.scrollIntoView({ behavior: "smooth"});
  }
})


  //Modal de Index
  const cerrarVentanaBtn = document.getElementById('cerrarmiModal')
  const miModal = document.getElementById('miModal')

  cerrarVentanaBtn.addEventListener('click', function () {
    return (miModal.style.display = 'none')
  })
})
