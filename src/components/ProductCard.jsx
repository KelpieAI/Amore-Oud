import { formatPrice } from '../data/products'
import './ProductCard.css'

export default function ProductCard({ product, className = '' }) {
  const shortName = product.name

  return (
    <div className={`product-card ${product.outOfStock ? 'out-of-stock' : ''} ${className}`.trim()}>
      <div className="product-card-img">
        {product.onSale && !product.outOfStock && <span className="product-badge sale">Sale</span>}
        {product.outOfStock && <span className="product-badge stock">Out of Stock</span>}
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-card-tag">{product.category === 'his' ? 'His' : product.category === 'hers' ? 'Hers' : 'Unisex'}</div>
      <div className="product-card-name">{shortName}</div>
      <div className="product-card-sub">{product.sub.replace(' · HIS COLLECTION', '').replace(' · HERS COLLECTION', '').replace(' · UNISEX COLLECTION', '')}</div>
      <div className="product-card-footer">
        <div className="product-card-price">
          {product.was && <span className="was">{formatPrice(product.was)}</span>}
          {formatPrice(product.price)}
        </div>
        <button type="button" className="product-card-btn" disabled={product.outOfStock}>
          {product.outOfStock ? 'Unavailable' : 'Add to Bag'}
        </button>
      </div>
    </div>
  )
}
