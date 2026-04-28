export function formatHour(hour) {
  const [hours, minutes] = hour.split(":").map(Number)
  return hours + minutes / 60
}
export function workedHours(startTime, endTime) {
  const diffInHours = endTime - startTime
  return diffInHours
}

export function totalHours(shifts) {
  return shifts.reduce(
    (acc, shift) => acc + workedHours(formatHour(shift.startUur), formatHour(shift.eindUur)),
    0,
  )
}

export function formatSalary(hours) {
  return hours.toFixed(2)
}

export function formatDate(datum) {
  const [jaar, maand, dag] = datum.slice(0, 10).split("-")
  return `${dag}/${maand}`
}

export function formatTime(time) {
  if (!time) return ""
  return time.slice(0, 5)
}
