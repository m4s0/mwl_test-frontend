export async function getAdminBaskets() {
  const requestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  }

  const response = await fetch('/admin/basket', requestInit)

  if (response.ok) {
    return await response.json()
  }
}
