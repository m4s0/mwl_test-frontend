export async function checkout(basketId) {
  const requestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }

  await fetch(`/basket/${basketId}/checkout`, requestInit)
}

