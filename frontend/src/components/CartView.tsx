"use client"

interface CartItem {
  productId: number
  quantity: number
  price: number
}

interface Product {
  id: number
  name: string
  price: number
}

interface CartViewProps {
  cartItems: CartItem[]
  products: Product[]
  total: number
  onRemoveItem: (productId: number) => void
  onCheckout: () => void
  onBackToShop: () => void
}

export default function CartView({
  cartItems,
  products,
  total,
  onRemoveItem,
  onCheckout,
  onBackToShop,
}: CartViewProps) {
  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <button className="btn btn-secondary" onClick={onBackToShop}>
          Back to Shop
        </button>
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Start shopping to add items to your cart</p>
          <button className="btn btn-primary" onClick={onBackToShop}>
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <button className="btn btn-secondary" onClick={onBackToShop}>
        Back to Shop
      </button>

      <div className="cart-content">
        <div className="cart-items">
          <h2>Shopping Cart</h2>
          <div className="items-list">
            {cartItems.map((item) => {
              const product = products.find((p) => p.id === item.productId)
              return (
                <div key={item.productId} className="cart-item">
                  <div className="item-details">
                    <h4>{product?.name}</h4>
                    <p className="item-price">${item.price.toFixed(2)} each</p>
                  </div>

                  <div className="item-quantity">
                    <span>Qty: {item.quantity}</span>
                  </div>

                  <div className="item-total">
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>

                  <button className="btn-remove" onClick={() => onRemoveItem(item.productId)}>
                    Remove
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-line">
            <span>Subtotal:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="summary-line">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="summary-total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button className="btn btn-primary btn-checkout" onClick={onCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
