import lodashFind from 'lodash/find'
import lodashRemove from 'lodash/remove'

export class Cart {
  items = []

  getTotal() {
    return this.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    )
  }

  add(item) {
    const maybeExistingItem = lodashFind(this.items, { product: item.product })

    if (maybeExistingItem) {
      lodashRemove(this.items, maybeExistingItem)
    }

    this.items.push(item)
  }

  remove(product) {
    lodashRemove(this.items, { product })
  }
}
