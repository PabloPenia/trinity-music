export async function getProducts() {
	try {
		const response = await fetch('./data/db.json')
		if (!response.ok) {
			throw new Error('No se encuetra el archivo json')
		}
		const products = await response.json()
		console.log(products)
	} catch (e) {
		console.log(e)
	}
}

// DELETE ME

export function showSection(caja) {
	if (caja.style.display === 'none') {
		// si el elemento esta oculto lo muestro
		caja.style.display = 'block'
	} else {
		// si el elemento se muestra lo oculto
		caja.style.display = 'none'
	}


	
}

