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
  const mostrarContactoBtn = document.getElementById('mostrar-contacto-btn')
  const contacto = document.getElementById('contacto')

  const mostrarNosotrosBtn = document.getElementById('mostrar-nosotros-btn')
  const nosotros = document.getElementById('nosotros')

  mostrarContactoBtn.addEventListener("click", function () {
    nosotros.classList.remove("active")
    contacto.classList.toggle("active")

    if (contacto.classList.contains("active")) {
      // Scroll to the newly displayed element
      contacto.scrollIntoView({ behavior: "smooth" });
    }
 })

 

  mostrarNosotrosBtn.addEventListener("click", function () {
    contacto.classList.remove("active")
    nosotros.classList.toggle("active")

    if (nosotros.classList.contains("active")) {
      // Scroll to the newly displayed element
      nosotros.scrollIntoView({ behavior: "smooth" });
    }
})



  //
  const cerrarVentanaBtn = document.getElementById('cerrarmiModal')
  const miModal = document.getElementById('miModal')

  cerrarVentanaBtn.addEventListener('click', function () {
    return (miModal.style.display = 'none')
  })
})
