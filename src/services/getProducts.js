export async function getProducts() {
  const requestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  }

  const response = await fetch('/product', requestInit)

  if (response.ok) {
    return await response.json()
  }
}
