export default function capitalize(str: string) {
  if (!str) return null
  return str[0].toUpperCase() + str.slice(1)
}
