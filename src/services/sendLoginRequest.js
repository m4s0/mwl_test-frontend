const LOGIN = '/login_check'

export async function sendLoginRequest(values) {
  const requestInit = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(values)
  }

  const response = await fetch(LOGIN, requestInit)
  if (response.ok) {
    return await response.json()
  }
  // @todo handle catch
}
