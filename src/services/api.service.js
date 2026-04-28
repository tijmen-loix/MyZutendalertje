async function login(code) {
  const res = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code })
  })
  if (!res.ok) throw new Error('Ongeldige code')
  return res.json()
}

async function getShifts(code) {
  const res = await fetch(`http://localhost:3000/shifts/${code}`)
  if (!res.ok) throw new Error('Shifts ophalen mislukt')
  return res.json()
}

async function getUsers() {
  const res = await fetch('http://localhost:3000/users')
  if (!res.ok) throw new Error('Users ophalen mislukt')
  return res.json()
}

async function updateUurloon(code, uurloon) {
  const res = await fetch(`http://localhost:3000/users/${code}/uurloon`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uurloon })
  })
  if (!res.ok) throw new Error('Uurloon aanpassen mislukt')
  return res.json()
}

export default {
  login,
  getShifts,
  getUsers,
  updateUurloon
}
