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
