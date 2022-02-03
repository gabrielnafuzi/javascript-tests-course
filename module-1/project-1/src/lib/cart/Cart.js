import lodashFind from 'lodash/find'
import lodashRemove from 'lodash/remove'
import Money from 'dinero.js'

Money.defaultCurrency = 'BRL'
Money.defaultPrecision = 2

export class Cart {
  items = []

  getTotal() {
    const sumReducer = (total, item) => {
      const amount = Money({ amount: item.product.price * item.quantity })
      let discount = Money({ amount: 0 })

      const shouldApplyDiscount =
        item.condition?.percentage && item.quantity > item.condition.minimum

      if (shouldApplyDiscount) {
        discount = amount.percentage(item.condition.percentage)
      }

      return total.add(amount).subtract(discount)
    }

    return this.items.reduce(sumReducer, Money({ amount: 0 }))
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
