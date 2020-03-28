export async function pickUpBasket() {
  const requestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  }

  const response = await fetch('/basket', requestInit)

  if (response.ok) {
    return await response.json()
  }
}
