export default function calcAge(date) {
  const actualYear = new Date().getFullYear();
  const birthDateYear = date.split('-')[0];

  return (actualYear - birthDateYear);
}