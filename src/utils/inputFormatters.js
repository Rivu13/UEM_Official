export function toDigitsOnly(value, maxLength) {
  const digits = value.replace(/\D/g, "")
  return maxLength ? digits.slice(0, maxLength) : digits
}

export function toMarksValue(value) {
  const cleaned = value.replace(/[^0-9.]/g, "")
  const [whole, ...rest] = cleaned.split(".")
  return rest.length ? `${whole}.${rest.join("")}` : whole
}
