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
      expect(cart.getTotal().getAmount()).toEqual(0)
    })

    it('should multiply quantity and price and receive the total amount', () => {
      const item = {
        product,
        quantity: 2,
      }

      cart.add(item)

      expect(cart.getTotal().getAmount()).toEqual(70776)
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

      expect(cart.getTotal().getAmount()).toEqual(35388)
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

      expect(cart.getTotal().getAmount()).toEqual(41872)
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

    it('should return an object with the total and the list of items when summary()', () => {
      cart.add({
        product,
        quantity: 2,
      })

      cart.add({
        product: product2,
        quantity: 3,
      })

      expect(cart.summary()).toMatchSnapshot()
      expect(cart.getTotal().getAmount()).toBeGreaterThan(0)
    })

    it('should reset the cart when checkout() is called', () => {
      cart.add({
        product: product2,
        quantity: 3,
      })

      cart.checkout()

      expect(cart.getTotal().getAmount()).toEqual(0)
    })
  })

  describe('special conditions', () => {
    it('should apply percentage discount quantity above minimum is passed', () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      }

      cart.add({
        product,
        quantity: 3,
        condition,
      })

      expect(cart.getTotal().getAmount()).toEqual(74315)
    })
  })
})
