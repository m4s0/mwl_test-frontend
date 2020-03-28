export async function updateProduct(basketId, payload) {
  const requestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
  }

  await fetch(`/basket/${basketId}/update`, requestInit)
}

