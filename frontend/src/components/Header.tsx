"use client"

interface HeaderProps {
  cartCount: number
  onCartClick: () => void
  isCartOpen: boolean
}

export default function Header({ cartCount, onCartClick, isCartOpen }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>ShopHub</h1>
        </div>

        <button className={`cart-button ${isCartOpen ? "active" : ""}`} onClick={onCartClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span className="cart-badge">{cartCount}</span>
        </button>
      </div>
    </header>
  )
}
