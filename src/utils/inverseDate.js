export default function inverseDate(date) {
  if (!date) {
    return "--/--/----"
  }
  const inverse = date.split('-')
  const day = inverse[2]
  const month = inverse[1]
  const year = inverse[0]

  return (day + "/" + month + "/" + year);
}