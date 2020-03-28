export async function removeProduct(basketId, productId) {
  const requestInit = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  }

  await fetch(`/basket/${basketId}/remove/${productId}`, requestInit)
}

