
export function formatHour(hour) {
  const [hours, minutes] = hour.split(":").map(Number)
  return hours + minutes / 60
}
export function workedHours(startTime, endTime) {
  const diffInHours = endTime - startTime
  return diffInHours
}

export function totalHours(shifts) {
  return shifts.reduce((acc, shift) => acc + workedHours(formatHour(shift.start), formatHour(shift.end)), 0)
}
