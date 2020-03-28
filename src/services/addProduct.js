export async function addProduct(basketId, values) {
  const requestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(values)
  }

  await fetch(`/basket/${basketId}/add`, requestInit)
}

