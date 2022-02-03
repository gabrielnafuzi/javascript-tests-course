import { Cart } from './Cart'

describe('Cart', () => {
  let cart = null
  let product = {
    title: 'Adidas running shoes - men',
    price: 35388, // 353.88 | R$ 353,88
  }

  let product2 = {
    title: 'Adidas running shoes - men',
    price: 41872, // 418.72 | R$ 418,72
  }

  beforeEach(() => {
    cart = new Cart()
  })

  describe('getTotal()', () => {
    it('should return 0 when getTotal() is executed in a newly created instance', () => {
      expect(cart.getTotal()).toEqual(0)
    })

    it('should multiply quantity and price and receive the total amount', () => {
      const item = {
        product,
        quantity: 2,
      }

      cart.add(item)

      expect(cart.getTotal()).toEqual(70776)
    })

    it('should ensure no more than one product exists at a time', () => {
      cart.add({
        product,
        quantity: 2,
      })

      cart.add({
        product,
        quantity: 1,
      })

      expect(cart.getTotal()).toEqual(35388)
    })

    it('should update total when a product gets included and then removed', () => {
      cart.add({
        product,
        quantity: 2,
      })

      cart.add({
        product: product2,
        quantity: 1,
      })

      cart.remove(product)

      expect(cart.getTotal()).toEqual(41872)
    })
  })

  describe('checkout', () => {
    it('should return an object with the total and the list of items', () => {
      cart.add({
        product,
        quantity: 2,
      })

      cart.add({
        product: product2,
        quantity: 3,
      })

      expect(cart.checkout()).toMatchSnapshot()
    })
  })
})
