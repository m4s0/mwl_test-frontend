const INVOICES = "/invoices"

function prepareResults(response, page, rowsPerPage) {
  const items = response['hydra:member'].map((row) => {
    return {
      uuid: row.uuid,
      createdAt: row.created_at,
      sender: row.sender.business_name,
      recipient: row.recipient.business_name,
      invoiceDate: row.invoiceDate,
      invoiceNumber: row.invoiceNumber,
      marking: row.marking,
    }
  })

  return {
    count: response['hydra:totalItems'],
    items: items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  }
}

export async function getInvoices(token, page, rowsPerPage, searchParams) {
  const requestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  }

  // const requestUrl = new URL(INVOICES),
  const requestUrl = new URL("http://localhost:8087/invoices")
  Object.keys(searchParams).forEach(key => requestUrl.searchParams.append(key, searchParams[key]))
  const response = await fetch(requestUrl, requestInit)

  if (response.ok) {
    const json = await response.json()

    return prepareResults(json, page, rowsPerPage)
  }
}
