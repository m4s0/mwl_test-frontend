const PRODUCTS = "http://localhost/products"

export async function getProducts() {
  const requestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    mode: 'no-cors'
  }

  const requestUrl = new URL(PRODUCTS)
  const response = await fetch(requestUrl, requestInit)

  if (response.ok) {
    const json = await response.json()

    return {
      count: json['count'],
      items: json['items']
    }
  }
}
