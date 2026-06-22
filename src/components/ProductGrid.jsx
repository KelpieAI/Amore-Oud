import Reveal from './Reveal'
import './ProductGrid.css'

const products = [
  {
    tag: 'His',
    name: 'Oud Noir Intense',
    sub: '100ml EDP',
    price: '£45',
    was: '£50',
    img: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=300&q=80',
  },
  {
    tag: 'Hers',
    name: 'Rose de Lune',
    sub: '85ml EDP',
    price: '£42',
    img: 'https://images.unsplash.com/photo-1592945403407-9caf930b0097?w=300&q=80',
  },
  {
    tag: 'Unisex',
    name: 'Amber Saffron',
    sub: '100ml EDP',
    price: '£48',
    was: '£55',
    img: 'https://images.unsplash.com/photo-1601295452898-4bf7f6cc6d4e?w=300&q=80',
  },
  {
    tag: 'His',
    name: 'Velvet Oud',
    sub: '100ml EDP',
    price: '£44',
    img: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=300&q=80',
  },
]

export default function ProductGrid() {
  return (
    <section className="products-section">
      <Reveal className="section-eyebrow">Featured</Reveal>
      <Reveal as="h2" className="section-title">
        New <em>Arrivals</em>
      </Reveal>
      <div className="products-grid">
        {products.map((p) => (
          <Reveal key={p.name} className="product-card">
            <div className="product-card-img">
              <img src={p.img} alt={p.name} />
            </div>
            <div className="product-card-tag">{p.tag}</div>
            <div className="product-card-name">{p.name}</div>
            <div className="product-card-sub">{p.sub}</div>
            <div className="product-card-footer">
              <div className="product-card-price">
                {p.was && <span className="was">{p.was}</span>}
                {p.price}
              </div>
              <button type="button" className="product-card-btn">
                Add to Bag
              </button>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
