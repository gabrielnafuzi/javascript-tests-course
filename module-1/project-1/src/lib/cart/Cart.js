export class Cart {
  items = [];

  getTotal() {
    return this.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  add(item) {
    this.items.push(item);
  }
}
