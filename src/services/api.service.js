const BASE_URL = import.meta.env.VITE_API_URL

async function login(code) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  })
  if (!res.ok) throw new Error("Ongeldige code")
  return res.json()
}

async function getShifts(code) {
  const res = await fetch(`${BASE_URL}/shifts/${code}`)
  if (!res.ok) throw new Error("Shifts ophalen mislukt")
  return res.json()
}

async function getUsers() {
  const res = await fetch(`${BASE_URL}/users`)
  if (!res.ok) throw new Error("Users ophalen mislukt")
  return res.json()
}

async function updateUurloon(code, uurloon) {
  const res = await fetch(`${BASE_URL}/users/${code}/uurloon`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uurloon }),
  })
  if (!res.ok) throw new Error("Uurloon aanpassen mislukt")
  return res.json()
}

async function addShift(code, datum, startUur, eindUur) {
  const res = await fetch(`${BASE_URL}/shifts/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, datum, startUur, eindUur }),
  })
  if (!res.ok) throw new Error("Shift toevoegen mislukt")
  return res.json()
}

async function getAllShifts() {
  const res = await fetch(`${BASE_URL}/shifts`)
  if (!res.ok) throw new Error("Shifts ophalen mislukt")
  return res.json()
}

async function deleteShift(id, code) {
  const res = await fetch(`${BASE_URL}/delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, code }),
  })
  if (!res.ok) throw new Error("Shift verwijderen mislukt")
  return res.json()
}

async function updateShift(id, code, datum, startUur, eindUur) {
  const res = await fetch(`${BASE_URL}/shifts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, datum, startUur, eindUur }),
  })
  if (!res.ok) throw new Error("Shift aanpassen mislukt")
  return res.json()
}

export default {
  login,
  getShifts,
  getUsers,
  updateUurloon,
  addShift,
  getAllShifts,
  deleteShift,
  updateShift,
}
