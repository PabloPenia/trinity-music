import { displayProducts, addToCart, updateCart } from './functions.js'

document.addEventListener('DOMContentLoaded', async () => {
  updateCart()
  // RESERVAR ESPACIO
  await displayProducts()
  const addToCartButtons = document.querySelectorAll('.cart-btn')
  addToCartButtons.forEach((button) => {
    button.addEventListener('click', addToCart)
  })

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
