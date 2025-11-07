import ProductCard from "./ProductCard"

interface Product {
  id: number
  name: string
  price: number
  description: string
  image: string
  category: string
}

interface ProductGridProps {
  products: Product[]
  onAddToCart: (productId: number, quantity: number) => void
}

export default function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  return (
    <div className="product-grid-container">
      <div className="products-header">
        <h2>Featured Products</h2>
        <p>Explore our collection of premium tech accessories</p>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  )
}
