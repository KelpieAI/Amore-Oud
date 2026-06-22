import Reveal from './Reveal'
import ProductCard from './ProductCard'
import { getFeaturedProducts } from '../data/products'
import './ProductGrid.css'

export default function ProductGrid() {
  const products = getFeaturedProducts()

  return (
    <section className="products-section">
      <Reveal className="section-eyebrow">Featured</Reveal>
      <Reveal as="h2" className="section-title">
        New <em>Arrivals</em>
      </Reveal>
      <div className="products-grid">
        {products.map((p) => (
          <Reveal key={p.id}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
