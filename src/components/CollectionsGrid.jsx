import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import { categoryMeta } from '../data/products'
import './CollectionsGrid.css'

const collections = [
  { key: 'his', name: 'His', path: '/his' },
  { key: 'hers', name: 'Hers', path: '/hers' },
  { key: 'unisex', name: 'Unisex', path: '/unisex' },
]

export default function CollectionsGrid() {
  return (
    <section className="section" id="collections">
      <Reveal className="section-eyebrow">Shop By Collection</Reveal>
      <Reveal as="h2" className="section-title">
        Find Your <em>Signature</em> Scent
      </Reveal>
      <div className="collections-grid">
        {collections.map((col) => (
          <Reveal key={col.key} className="collection-card">
            <img src={categoryMeta[col.key].image} alt={col.name} />
            <div className="collection-overlay">
              <div className="collection-tag">Collection</div>
              <div className="collection-name">{col.name}</div>
              <Link to={col.path} className="collection-cta">
                Explore →
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
