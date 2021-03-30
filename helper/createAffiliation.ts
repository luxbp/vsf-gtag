export default (products: any[]): string => {
  let totals = {}

  products.forEach((item) => {
    if (item.brand) {
      totals[item.brand] = (totals[item.brand] || 0) + (item.price * item.quantity)
    }
  });

  let keys = Object.keys(totals);
  if (keys.length === 0) {
    return null
  }

  return keys.reduce((max, key) => {
    return (max === undefined || totals[key] > totals[max]) ? key : max
  });
}
