export async function getBasket(basketId) {
  const requestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  }

  const response = await fetch(`/basket/${basketId}`, requestInit)

  if (response.ok) {
    return await response.json()
  }

  response.notOk = true
  return response
}
