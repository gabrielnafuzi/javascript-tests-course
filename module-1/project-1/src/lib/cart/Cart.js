import lodashFind from 'lodash/find'
import lodashRemove from 'lodash/remove'
import Money from 'dinero.js'

Money.defaultCurrency = 'BRL'
Money.defaultPrecision = 2

export class Cart {
  items = []

  getTotal() {
    return this.items.reduce(
      (total, item) =>
        total.add(Money({ amount: item.product.price * item.quantity })),
      Money({ amount: 0 })
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

  summary() {
    const total = this.getTotal().getAmount()
    const items = this.items

    return {
      total,
      items,
    }
  }

  checkout() {
    const { total, items } = this.summary()

    this.items = []

    return {
      total,
      items,
    }
  }
}
